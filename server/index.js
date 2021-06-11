if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: process.env.DBPASSWORD,
    database: "users_sql_login"
});

app.post("/register", (req, res) => {
    const email = req.body.email.toString();
    const password = req.body.password.toString();
    console.log(req.body);

    db.query(
        "SELECT * FROM users WHERE email = ?", 
        [email], 
        (err, result) => {
            if(err) {
                res.send({ err: err });
            } 

            if(result.length > 0) {
                res.send({ message: "Email is already being used." });
            } else {
                db.query(
                    "INSERT INTO users (email, password) VALUES (?, ?)", 
                    [email, password], 
                    (err, result) => {
                        if(err) {
                            res.send({ err: err });
                        } 
            
                        res.send(result);
                    }
                );
            }
        }
    );
})

app.post("/login", (req, res) => {
    const email = req.body.email.toString();
    const password = req.body.password.toString();
    console.log(req.body);
    
    db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?", 
        [email, password], 
        (err, result) => {
            if(err) {
                res.send({ err: err });
            } 

            if(result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong email or password." });
            }
        }
    );
})

app.listen(4000, () => { console.log("running server") });