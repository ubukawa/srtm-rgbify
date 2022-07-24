//script to
const config = require('config')
const fs = require('fs')
const tilebelt = require('@mapbox/tilebelt')

const srcDir = config.get('srcDir')

var fileList = fs.readdirSync(srcDir) //list from the src folder
fileList = fileList.filter(r => r.indexOf('.tif') !== -1)

let srtmFiles = [] //list from the src folder
for (let i=0; i<fileList.length; i++){
    srtmFiles.push(fileList[i].replace('SRTM1','').replace('W','_w').replace('E','_e').replace('V3','_1arc_v3.tif').toLowerCase())
}

var modules = []
var modulesObj = {}
var emptyModules = []

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
    modulesObj[key] = []

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
            nm = `${n.toLowerCase()}_${m.toLowerCase()}_1arc_v3.tif`
            if(srtmFiles.includes(nm)){
                console.log (`${nm}---> yes(${key})`)
                modules[key].push(nm)
                modulesObj[key].push(nm)
            }    
            //} else {
            //    console.log (`${n}${m}`)
            //}
            //console.log(`${n}${m}`)
        }
    }
    //console.log(module[key])
    if (modules[key].length == 0){
        //modules[key] = null
        //delete module[key]
        emptyModules.push(key)
    } 
    if (modulesObj[key].length == 0){
        delete modulesObj[key]
    } 

}


//modules = modules.filter(v => !emptyModules.includes(v))

console.log(modulesObj)
console.log(Object.keys(modulesObj)) //object to array
console.log(Object.keys(modulesObj).length)
//console.log(emptyEodules)
//console.log(srtmFiles)
