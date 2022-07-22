const fs = require('fs')


var fileList = fs.readdirSync('src')
console.log(fileList)