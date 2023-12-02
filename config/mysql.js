require("dotenv").config();
const mysql = require("mysql2");

const IP = process.env.MYSQL_IP;
const LOGIN = process.env.MYSQL_LOGIN;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.MYSQL_DATABASE;

let con = mysql.createConnection({
  host: IP,
  user: LOGIN,
  password: PASSWORD,
  database: DATABASE,
});

module.exports = con;
