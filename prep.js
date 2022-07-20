var fs = require('fs')
var data = JSON.parse(fs.readFileSync('0-area/srtm30m_bounding_boxes.json', 'utf8'))

const fsOption = {
    encoding: "utf8"
}

const FSstream = fs.createWriteStream('names.json', fsOption)

//console.log(data.features[1].properties.dataFile)

for (const key in data.features) {
//console.log(data.features[key].properties.dataFile)
let name = data.features[key].properties.dataFile.split('.')[0]
FSstream.write(`\x1e${JSON.stringify(name)}\n`) //console.log(name)
}

FSstream.end()

