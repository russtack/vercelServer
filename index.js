if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: process.env.user,
  host: process.env.host,
  password: process.env.password,
  database: process.env.database,
});

app.post("/create", (req, res) => {
  const date = req.body.date;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const rating = req.body.rating;
  db.query(
    "INSERT INTO employees (date, firstname, lastname, rating) VALUES(?,?,?,?)",
    [date, firstName, lastName, rating],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values inserted");
      }
    }
  );
});

app.get("/report", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3306, () => {
  console.log("listening port 3306");
});
