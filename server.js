const express  = require('express')
const app = express()

const port = 8000

app.get('/hello_world',(req,res) => {
    res.send('hello world')
})

app.get('/showscore',(req,res) => {
    res.send()
})

app.get('/showscorefull',(req,res) => {
    res.send()
})

app.post('/showscore',(req,res) => {
    res.send()
})

app.listen(port, (req, res) =>{
    console.log('http server run at '+ port)
})

