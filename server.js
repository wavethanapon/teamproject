const express  = require('express')
const bodyparser  = require('body-parser')
const mysql = require('mysql2/promise')
const path = require('path')
const app = express()
app.use(express.json());
const {google} = require("googleapis")

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
app.get("/", async (req, res) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: "credential.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });

        const client = await auth.getClient();
        const googlesheet = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = "1rAc0wxCOTY4wIYaO6Ch8nR1rveQUWSms4WGNN2c-wGw";

        const getRows = await googlesheet.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Form Responses 1!A:F",
        });

        const rows = getRows.data.values;
        if (!rows || rows.length < 2) {
            return res.json([]); // Return empty array if there's no data
        }

        const headers = rows[0]; // First row as headers
        const data = rows.slice(1).map(row => {
            return headers.reduce((obj, header, index) => {
                obj[header] = row[index] || ""; // Assign values to headers
                return obj;
            }, {});
        });

        res.json(data); // Return transformed data as JSON
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data from Google Sheets");
    }
});


app.listen(port, (req, res) =>{
    console.log('http server run at '+ port)
})

