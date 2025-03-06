const express  = require('express')
const bodyparser  = require('body-parser')
const mysql = require('mysql2/promise')
const path = require('path')
const app = express()
app.use(express.json());
const port = 8000


app.get('/hello_world',(req,res) => {
    res.send('hello world')
})


app.post('/login', async (req, res) => {
    try {
        const data = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'karma',
            database: 'Karma',
            port: '5000'
        })
        const { email } = req.body; // Extract email from request body
        if (!email) {
            return res.status(400).json({ error: "Email is required" })
        }

        const sql = 'SELECT email, passwords FROM students WHERE email = ?'
        const [results] = await data.query(sql, [email]);

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" })
        }

        res.json(results[0])
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Error fetching users' })
    }
})

app.get('/showscore', async (req,res) => {
    try {
        const data = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'karma',
            database: 'Karma',
            port: '5000'
        })
        const results = await data.query('SELECT students.student_id,full_name ,total_points FROM students JOIN student_points ON students.student_id = student_points.student_id;')
        res.json(results[0])
    }   catch (error) {
        console.error('Error fetching users:', error.message)
        res.status(500).json({ error: 'Error fetching users' })
    }
})

app.get('/showscorefull',async (req,res) => {
    try {
        const data = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'karma',
            database: 'Karma',
            port: '5000'
        })
        const results = await data.query('SELECT s.student_id, full_name, nickname, year_name, email, phone, total_points FROM students AS s JOIN student_points AS sp ON s.student_id = sp.student_id JOIN years AS y ON y.id = s.years ORDER BY s.student_id;')
        res.json(results[0])
    }   catch (error) {
        console.error('Error fetching users:', error.message)
        res.status(500).json({ error: 'Error fetching users' })
    }
})

app.post('/loginadmin', async (req, res) => {
    try {
        const data = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'karma',
            database: 'Karma',
            port: '5000'
        })
        const { email } = req.body; // Extract email from request body
        if (!email) {
            return res.status(400).json({ error: "Email is required" })
        }

        const sql = 'SELECT email, password FROM teachers WHERE email = ?'
        const [results] = await data.query(sql, [email]);

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" })
        }

        res.json(results[0])
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Error fetching users' })
    }
})

// api google



app.listen(port, (req, res) =>{
    console.log('http server run at '+ port)
})

