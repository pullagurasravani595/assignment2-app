
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root19325",
    database: "mydatabase"
})

app.post("/login", (request, response) => {
    const checkRegisterUser = `
          SELECT * FROM login WHERE username = ? AND password = ?;`;
    db.query(checkRegisterUser, [request.body.username, request.body.password], (err, data) => {
        if (err) return response.json(err);
        if (data.length === 0) {
            return response.json("login failed")
        }else {
            const isMatchedPassword = request.password === data.password
            return response.json(isMatchedPassword)
        }
    })
});
  
app.listen(8081, () => {
    console.log("lisening ...8081")
})



module.exports = app;