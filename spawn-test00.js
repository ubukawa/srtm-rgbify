//test of gdal_merge.py from node js
const config = require('config')
const {spawn} = require('child_process')

const srcDir = config.get('srcDir')
const gdalmergePath = config.get('gdalmergePath')

let gdalmergeArray = [
    '-o', 'test-merged.tif' 
]
var inputSrc = new Array(
    `${srcDir}/s04_e010_1arc_v3.tif`,
    `${srcDir}/s04_e011_1arc_v3.tif`
)
gdalmergeArray = gdalmergeArray.concat(inputSrc)

const gdalmerge = spawn(gdalmergePath,gdalmergeArray)
gdalmerge.on('exit', () => {
    console.log('end')
    console.log(gdalmergeArray)
})

//gdalmerge
