const fs = require('fs')
const config = require('config')

const srcDir = config.get('srcDir')

var fileList = fs.readdirSync(srcDir)
fileList = fileList.filter(r => r.indexOf('.tif') !== -1)

console.log(fileList)
console.log(fileList.length)
