const express = require("express");
const app = express();
const { Client } = require("cassandra-driver");
const con = require("../config/mysql");
const credentials_datastax = require("../config/datastax");
const PORT = 9037;

// ---------------------------------------------------------------------------------------- //

con.connect(function (err) {
  if (err) throw err;
  console.log("Connection with mysql established");
});


app.listen(PORT, () => {
  console.log("Server running in port " + PORT)
});
// http://localhost:9037/get_customers_rentals

// ---------------------------------------------------------------------------------------- //

async function run() {
  const client = new Client({
    cloud: {
      secureConnectBundle: credentials_datastax.bundle,
    },
    credentials: {
      username: credentials_datastax.clientId,
      password: credentials_datastax.secret,
    },
  });
  
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
    dept_no INT PRIMARY KEY,
    emp_name TEXT
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

  await client.execute(createSalariesTableQuery);
  await client.execute(createTitlesTableQuery);
  await client.execute(createEmployeesTableQuery);
  await client.execute(createDepartmentsTableQuery);
  await client.execute(createDeptManagerTableQuery);
  await client.execute(createDeptEmpTableQuery);
  await processarDados(client);
  await client.shutdown();
}


// ----------------------------------------------------------------------------------- //

async function processarDados(client) {
  console.log("Iniciando a transferência de dados...");
  const query = `SELECT * FROM employees ORDER BY emp_no LIMIT 100`;
  try {
    const [results] = await con.promise().query(query);
    if (results.length === 0) {
      console.log("Nenhum dado novo encontrado.");
      return;
    }

    //results.sort((a, b) => a.emp_no - b.emp_no);

    for (const row of results) {
      const insertQuery =
        "INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (?, ?, ?, ?, ?, ?)";
      const params = [row.emp_no, row.birth_date, row.first_name, row.last_name, row.gender, row.hire_date];
      await client.execute(insertQuery, params, { prepare: true });
    }
    console.log("Dados inseridos com sucesso no Cassandra.");
  } catch (error) {
    console.error("Erro ao processar dados:", error);
  }
}


run();