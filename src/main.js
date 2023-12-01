const express = require("express");
const app = express();
const { Client } = require("cassandra-driver");
const con = require("../config/mysql");
const credentials_datastax = require("../config/datastax");
const PORT = 9037;
//import * as migrations from './migrations.js';

// --------------------------------------------------------------------------------------- //

const employeesQuery = `SELECT * FROM employees ORDER BY emp_no LIMIT 100`;
const employeesInsertQuery =
  "INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (?, ?, ?, ?, ?, ?)";
const employeesParams = [
  "emp_no",
  "birth_date",
  "first_name",
  "last_name",
  "gender",
  "hire_date",
];

// -------------------------------------------------------------- //

const departmentsQuery = "SELECT * FROM departments";
const departmentsInsertQuery =
  "INSERT INTO departments (dept_no, dept_name) VALUES (?, ?) IF NOT EXISTS";
const departmentsParams = ["dept_no", "dept_name"];

// -------------------------------------------------------------- //

async function transferData(
  tableName,
  connection,
  tableQuery,
  client,
  insertQuery,
  tableParams
) {
  console.log(`Iniciando a transferência de dados (${tableName})...`);

  try {
    const [results] = await connection.promise().query(tableQuery);
    //console.log(results);
    if (results.length === 0) {
      console.log(`Nenhum dado novo encontrado na tabela ${tableName}.`);
      return;
    }

    for (const row of results) {
      //console.log("Row: ", row);
      var params = tableParams.map((param) => row[param]);
      const resultQuery = await client.execute(insertQuery, params, {
        prepare: true,
      });

      /*let i = 0;
      if (resultQuery.first === null) {
        console.log("Dado inserido com sucesso: ", row);
      } else {
        console.log("Dado já existente, não inserido: ", row);
      }*/
    }

    console.log(
      `Dados da tabela ${tableName} inseridos com sucesso no Cassandra.`
    );
  } catch (error) {
    console.error(`Erro ao processar dados (${tableName}):`, error);
  }
}

// ---------------------------------------------------------------------------------------- //

con.connect(function (err) {
  if (err) throw err;
  console.log("Connection with mysql established");
});

let server = app.listen(PORT, () => {
  console.log("Server running in port " + PORT);
});
// http://localhost:9037/get_customers_rentals

const client = new Client({
  cloud: {
    secureConnectBundle: credentials_datastax.bundle,
  },
  credentials: {
    username: credentials_datastax.clientId,
    password: credentials_datastax.secret,
  },
});

// ---------------------------------------------------------------------------------------- //

async function run() {
  try {
    await client.connect();
  } catch (error) {
    console.log("CLIENT não conseguiu conectar: " + error);
  }

  await client.execute("use m3");

  const createSalariesTableQuery = `
  CREATE TABLE IF NOT EXISTS salaries (
    emp_no INT PRIMARY KEY,
    salary INT,
    from_date DATE,
    to_date DATE
  );
`;

  const createTitlesTableQuery = `
  CREATE TABLE IF NOT EXISTS titles (
    emp_no INT PRIMARY KEY,
    title TEXT,
    from_date DATE,
    to_date DATE
  );
`;

  const createEmployeesTableQuery = `
  CREATE TABLE IF NOT EXISTS employees (
    emp_no INT PRIMARY KEY,
    birth_date DATE,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    hire_date DATE
  );
`;

  const createDepartmentsTableQuery = `
  CREATE TABLE IF NOT EXISTS departments (
    dept_no TEXT PRIMARY KEY,
    dept_name TEXT
  );
`;

  const createDeptManagerTableQuery = `
  CREATE TABLE IF NOT EXISTS dept_manager (
    dept_no INT,
    emp_no INT PRIMARY KEY,
    from_date DATE,
    to_date DATE
  );
`;

  const createDeptEmpTableQuery = `
  CREATE TABLE IF NOT EXISTS dept_emp (
    emp_no INT PRIMARY KEY,
    dept_no TEXT,
    from_date DATE,
    to_date DATE
  );
`;

  //await client.execute(createSalariesTableQuery);
  //await client.execute(createTitlesTableQuery);
  //await client.execute(createEmployeesTableQuery);
  await client.execute(createDepartmentsTableQuery);
  //await client.execute(createDeptManagerTableQuery);
  //await client.execute(createDeptEmpTableQuery);
  //await processarDados(client);
  await transferData(
    "employees",
    con,
    employeesQuery,
    client,
    employeesInsertQuery,
    employeesParams
  );

  app.get("/get_employees", async function (req, res) {
    await client.connect();
    const sql_select = "select * from employees"; //where Customer = ?
    let query = sql_select;
    let parameters = []; //req.query.customer
    let result = await client.execute(query, parameters);
    console.log("total sync: ", result.rows.length);
    //CORS
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST,GET,OPTIONS,PUT,DELETE,HEAD"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-PINGOTHER,Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader("Access-Control-Max-Age", "1728000");
    res.send(JSON.stringify(result.rows));
  });

  app.get("/get_departments", async function (req, res) {
    await client.connect();
    const sql_select = "select * from departments"; //where Customer = ?
    let query = sql_select;
    let parameters = []; //req.query.customer
    let result = await client.execute(query, parameters);
    console.log("total sync: ", result.rows.length);
    //CORS
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST,GET,OPTIONS,PUT,DELETE,HEAD"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-PINGOTHER,Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader("Access-Control-Max-Age", "1728000");
    res.send(JSON.stringify(result.rows));
  });

  app.get("/quit", async function (req, res) {
    try {
      console.log("Clossing APP and CLIENT...");
      await closeAll();
    } catch (error) {
      console.log("Problem with closing: ", error);
    }
  });
  client.shutdown();
  server.close();
}

// ----------------------------------------------------------------------------------- //

async function closeAll(client, app) {
  client.shutdown();
  app.close();
}
// ----------------------------------------------------------------------------------- //

run();
