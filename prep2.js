//script to store the list of the DEMfile
var fs = require('fs')
var data = JSON.parse(fs.readFileSync('0-area/srtm30m_bounding_boxes.json', 'utf8'))
var srcFiles = []

for (const key in data.features) {
let name = data.features[key].properties.dataFile.split('.')[0]
srcFiles.push(name)
}





var bbox = [-1.5, 1.5, 3.2, 5] //[xmin, ymin, xmax, ymax]

//console.log(bbox[0])

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
        nm = `${n}${m}`
        if(srcFiles.includes(nm)){
            console.log (`${n}${m}---> yes`)
        } else {
            console.log (`${n}${m}`)
        }
        //console.log(`${n}${m}`)
    }
}