const express  = require('express')
const bodyparser  = require('body-parser')
const mysql = require('mysql2/promise')
const app = express()

const port = 8000


app.get('/hello_world',(req,res) => {
    res.send('hello world')
})

app.get('/showscore',(req,res) => {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'Karma'
    }).then((data) => {
        data
        .query('SELECT * FROM')
        .then((results) => {
            res.json(results[0])
    })
    .catch((error) => {
        console.error('Error fetching users:', error.message)
        res.status(500).json({ error: 'Error fetching users' })
        })
    })
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

