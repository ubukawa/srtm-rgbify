const fs = require('fs')
const config = require('config')

const srcDir = config.get('srcDir')
const srtmFiles = config.get('srtmFiles') //list from the EarthExplorer

var fileList = fs.readdirSync(srcDir) //list from the src folder
fileList = fileList.filter(r => r.indexOf('.tif') !== -1)

let srtmFiles2 = [] //list from the src folder
for (let i=0; i<srtmFiles.length; i++){
    //srtmfile = srtmfile.replace('SRTM','ww')
    //srtmFiles[i] = srtmFiles[i].replace('SRTM','ww')
    //console.log(srtmFiles[i].replace('SRTM1','').replace('W','_w').replace('E','_e').replace('V3','_1arc_v3.tif').toLowerCase())
    srtmFiles2.push(srtmFiles[i].replace('SRTM1','').replace('W','_w').replace('E','_e').replace('V3','_1arc_v3.tif').toLowerCase())
}

//console.log(srtmFiles)
console.log(srtmFiles2)
console.log(srtmFiles2.length)
//console.log(srtmFiles.length)

//console.log(fileList)
//console.log(fileList.length)
