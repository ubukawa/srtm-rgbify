//modules
const config = require('config')
const fs = require('fs')
const tilebelt = require('@mapbox/tilebelt')
const Queue = require('better-queue')

//config parameters
const srcDir = config.get('srcDir')

let modulesObj = {} //object {key: [srcFile, ... ], ...}
let emptyModules = []
let keys = [] //Array of key such as "6-x-y"
let keyInProgress = []
let idle = true

const isIdle = () => {
    return idle
}

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

console.log(`-------UNVT---------------\nProduction starts: \n- From the saved sources, we have ${Object.keys(modulesObj).length} modules with SRTM DEM. \n- ${emptyModules.length} modules are without SRTM DEM.\n--------------------------`)
console.log(`Here is the list of ${Object.keys(modulesObj).length} modules: \n${Object.keys(modulesObj)}`) 




const queue = new Queue(async (t, cb) => {
    const startTime = new Date()
    const key = t.key
    const tile = t.tile
    const [z, x, y] = tile

    keyInProgress.push(key)
    console.log(`[${keyInProgress}] in progress`)

    console.log(`${key}: ${modulesObj[key].length}\n(${modulesObj[key]})`) //list of src files


    const sample = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve()
            }, 500)
    })

    sample.then(() => {
        keyInProgress = keyInProgress.filter((v) => !(v === key))  
        return cb()
    })

    },{
    concurrent: 3,
    maxRetries: 3,
    retryDelay: 5000
    })

const queueTasks = () => {
    for (let module of Object.keys(modulesObj)){
    //for (let tile of [[6,32,20],[6,32,21],[6,32,22],[6,32,23],[6,33,20],[6,33,21],[6,33,22]]){
    //for (let key of ['bndl1', 'bndl2', 'bndl3', 'bndl4', 'bndl5', 'bndl6']){
        let tile = module.split('-').map(v => Number(v))
        queue.push({
            key: module,
            tile: tile
        })
    }
}

const shutdown = () => {
    console.log('** production system shutdown! (^_^) **')
  }

  const main = async () =>{
    const stTime = new Date()
    console.log(`${stTime.toISOString()}: Production starts. `)
    queueTasks()
    queue.on('drain', () => {
        const closeTime = new Date()
        console.log(`Production ends: ${stTime.toISOString()} --> ${closeTime.toISOString()}`)
        shutdown()
    })
}

main()