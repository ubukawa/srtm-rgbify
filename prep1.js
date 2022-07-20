var fs = require('fs')
var data = JSON.parse(fs.readFileSync('0-area/srtm30m_bounding_boxes.json', 'utf8'))
var modules = []

for (const key in data.features) {
let name = data.features[key].properties.dataFile.split('.')[0]
modules.push(name)
}

console.log(modules)
