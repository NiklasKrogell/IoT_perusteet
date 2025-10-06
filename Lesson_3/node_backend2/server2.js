const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;

app.use(express.json());

// Create or open the database
const db = new sqlite3.Database('./data.db', (err) => {
    if (err){
        console.error("Error opening database " + err.message);
    }
    console.log("Connected to database");
});

db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)', (err) => {
    if(err){
        console.error("Error creating table " + err.message);
    }
    console.log("Table created or exists already");
});

// Sensor GET endpoint
app.get('/api/sensor', (req, res) => {
    res.json({
    temperature: 22.5,
    humidity: 55,
    status: "OK"
    });
});

// Users GET endpoint
app.get('/api/users', (req, res) => {
    console.log("In Get endpoint");
    db.all('SELECT * FROM users', [], (err, rows) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});

// Users POST endpoint
app.post('/api/users', (req, res) => {
    console.log("In Post endpoint");
    const name = req.body;
    db.run('INSERT INTO users (name) VALUES (?)', [name], function(err){
        if(err) return res.status(400).json({error: err.message});
        res.status(201).json({id: this.lastID, name});
    });
});

app.listen(port, () => {
    console.log(`Server running at
    http://localhost:${port}`);
});