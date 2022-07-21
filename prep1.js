//script to store the list of the DEMfile
var fs = require('fs')
var data = JSON.parse(fs.readFileSync('0-area/srtm30m_bounding_boxes.json', 'utf8'))
var modules = []

for (const key in data.features) {
let name = data.features[key].properties.dataFile.split('.')[0]
modules.push(name)
}

//console.log(modules)

var tests = ['N00E006', 'nono']

for (var test in tests) {
    if (modules.includes(test)) {
        console.log(`Yes, we have ${tests[test]}.`)
    } else {
        console.log(`No, we do not have ${tests[test]}.`)
    }
}