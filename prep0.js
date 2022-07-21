//script to write the file name
var fs = require('fs')
var data = JSON.parse(fs.readFileSync('0-area/srtm30m_bounding_boxes.json', 'utf8'))

const fsOption = {
    encoding: "utf8"
}

const FSstream = fs.createWriteStream('names.txt', fsOption)

for (const key in data.features) {
let name = data.features[key].properties.dataFile.split('.')[0]
FSstream.write(`\x1e${JSON.stringify(name)}\n`) //console.log(name)
}

FSstream.end()

