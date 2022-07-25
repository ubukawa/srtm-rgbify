//modules
const config = require('config')
const fs = require('fs')
const tilebelt = require('@mapbox/tilebelt')

//config parameters
const srcDir = config.get('srcDir')

let modulesObj = {} //object {key: [srcFile, ... ], ...}
let emptyModules = []
let keys = [] //Array of key such as "6-x-y"

let fileList = fs.readdirSync(srcDir) //list from the src folder
fileList = fileList.filter(r => r.indexOf('.tif') !== -1) //only tiff file

let srtmFiles = [] //list from the src folder. file name: nXX_eXXX_1arc_V3.tif
for (let i=0; i<fileList.length; i++){
    srtmFiles.push(fileList[i].replace('SRTM1','').replace('W','_w').replace('E','_e').replace('V3','_1arc_v3.tif').toLowerCase())
}

//keys
for (x = 0; x < 64; x ++){
    for (y = 0; y < 64; y++) {
        let key = `6-${x}-${y}`
        keys.push(key)
    }
}

for (const key of keys){
//for (const key of ['6-31-31','6-32-32']){
    let [tilez, tilex, tiley] = key.split('-')
    tilex = Number(tilex)
    tiley = Number(tiley)
    tilez = Number(tilez)
    const bbox = tilebelt.tileToBBOX([tilex, tiley, tilez])
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
                //console.log (`${nm}---> yes(${key})`)
                modulesObj[key].push(`${srcDir}/${nm}`)
            }    
        }
    }
    if (Object.keys(modulesObj[key]).length == 0) {
        emptyModules.push(key)
    } 
    if (modulesObj[key].length == 0){
        delete modulesObj[key]
    } 

}

//console.log(modulesObj)
//console.log(Object.keys(modulesObj)) // Array of modules
//console.log(Object.keys(modulesObj).length) // length of the modules
//console.log(emptyModules.length)

console.log(`-------UNVT---------------\nProduction starts: \n- We have ${Object.keys(modulesObj).length} modules with SRTM DEM. \n- ${emptyModules.length} modules are without SRTM DEM.\n-------UNVT---------------`)
console.log(`Here is the list of ${Object.keys(modulesObj).length} modules: \n${Object.keys(modulesObj)}`) 
