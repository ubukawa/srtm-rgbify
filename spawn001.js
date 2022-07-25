const {spawn} = require('child_process')


//spawn('ls', ['./../../srtm-dl'])
const child = spawn('ls', ['-al', 'src'])
//const child = spawn('ls', ['-----', 'src']) //to check stderr

child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
})

child.stderr.on('data', (data) =>{
    console.log(`stderr:${data}`)
})

child.on('error', (error) => console.log(error.message.message))

child.on('exit', (code, signal) =>{
    if(code) console.log(`process exit with code: ${code}.`)
    if(signal) console.log(`process killed with signal: ${signal}.`)
    console.log('done')
})