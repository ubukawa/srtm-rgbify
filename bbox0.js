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
        console.log(`${n}${m}`)
    }




    //console.log(m)



}