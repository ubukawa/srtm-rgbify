//script to
const fs = require('fs')
const tilebelt = require('@mapbox/tilebelt')
var data = JSON.parse(fs.readFileSync('0-area/srtm30m_bounding_boxes.json', 'utf8'))
var srcFiles = []
var modules

for (const key in data.features) {
let name = data.features[key].properties.dataFile.split('.')[0]
srcFiles.push(name)
}

const key = '6-33-31'
//const key = '6-33-31'
var [tilez, tilex, tiley] = key.split('-')
tilex = Number(tilex)
tiley = Number(tiley)
tilez = Number(tilez)
const bbox = tilebelt.tileToBBOX([tilex, tiley, tilez])
//const bbox = tilebelt.tileToBBOX([32,29,6])
//var bbox = [-1.5, 1.5, 3.2, 5] //[xmin, ymin, xmax, ymax]
//console.log(bbox)

console.log(key)
module[key] = []

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
            console.log (`${n}${m}---> yes`)
            module[key].push(nm)
        } else {
            console.log (`${n}${m}`)
        }
        //console.log(`${n}${m}`)
    }
}




console.log(module[key])
