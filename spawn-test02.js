//test of gdal_merge.py and rasterio rgbify from node js
const config = require('config')
const {spawn} = require('child_process')

const srcDir = config.get('srcDir')
const gdalmergePath = config.get('gdalmergePath')
const rasterioPath = config.get('rasterioPath')
const maxZ = config.get('maxZ')
const minZ = config.get('minZ')

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
    const RGBconversion = new Promise((resolve, reject)=>{
        const rasterio = spawn(rasterioPath,[
            'rgbify', '-b', '-10000', '-i', '0.1',
            '--max-z', maxZ, '--min-z', minZ, '--format', 'webp',
            'test-merged.tif', 'out000.mbtiles'
        ])
        .on('exit', ()=>{
            //do something if needed
            resolve()
        })
    }).then(()=>{
        console.log('All end')
    })
})

//gdalmerge
