//script to
//const config = require('config')
const fs = require('fs')
const tilebelt = require('@mapbox/tilebelt')
const { clear } = require('console')
var data = JSON.parse(fs.readFileSync('0-area/srtm30m_bounding_boxes.json', 'utf8'))
var srcFiles = []
var modules = []

for (const src in data.features) {
let name = data.features[src].properties.dataFile.split('.')[0]
srcFiles.push(name)
}

let keys = []
for (x = 0; x < 64; x ++){
    for (y = 0; y < 64; y++) {
        let key = `6-${x}-${y}`
        keys.push(key)
    }
}
//console.log(keys)

for (const key of keys){
//for (const key of ['6-31-31','6-32-32']){
//const key = '6-33-31'
    var [tilez, tilex, tiley] = key.split('-')
    tilex = Number(tilex)
    tiley = Number(tiley)
    tilez = Number(tilez)
    const bbox = tilebelt.tileToBBOX([tilex, tiley, tilez])
    //var bbox = [-1.5, 1.5, 3.2, 5] //[xmin, ymin, xmax, ymax]
    //console.log(bbox)
    //console.log(key)
    modules[key] = []

    for (x=Math.floor(bbox[0]); x < bbox[2]; x++ ){
        m = x.toString(10) // 10 means decimal
    
        if(x < 0) {
            m = m.replace("-","")
            if(m.length == 1){
                m = `00${m}`
            } else if (m.length == 2) {
                m = `0${m}`
            }
            m = `W${m}`
        } else {
            if(m.length == 1){
                m = `00${m}`
            } else if (m.length == 2) {
                m = `0${m}`
            }
            m = `E${m}`
        } // Then, m has proper string

        for (y = Math.floor(bbox[1]); y < bbox[3]; y++){
            n = y.toString(10)
            if(y<0){
                n = n.replace("-","")
                if(n.length == 1) {
                    n = `0${n}` 
                }
                n = `S${n}`
            } else {
                if(n.length == 1) {
                    n = `0${n}` 
                }
                n = `N${n}`
            }
            nm = `${n}${m}`
            if(srcFiles.includes(nm)){
                //console.log (`${n}${m}---> yes`)
                modules[key].push(nm)
            }    
            //} else {
            //    console.log (`${n}${m}`)
            //}
            //console.log(`${n}${m}`)
        }
    }
    //console.log(module[key])
    if (modules[key].length == 0){
        modules[key] = null
    } 
}
console.log(modules)
