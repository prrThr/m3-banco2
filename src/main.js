const express = require("express");
const app = express();
const { Client } = require("cassandra-driver");
const con = require("../config/mysql");
const credentials_datastax = require("../config/datastax");
// ---------------------------------------------------------------------------------------- //
con.connect(function (err) {
  if (err) throw err;
  console.log("Connection with mysql established");
});
// ---------------------------------------------------------------------------------------- //
app.listen(9037); // initialize web server
// http://localhost:9037/get_customers_rentals

async function run() {
  const client = new Client({
    cloud: {
      secureConnectBundle: "C:/Users/maiaa/Downloads/secure-connect-database-m3.zip",
    },
    credentials: {
      username: credentials_datastax.clientId,
      password: credentials_datastax.secret,
    },
  });
  await client.connect();
  await client.execute("use m3");
  // ---------------------------------------------------------------------------------------- //
  /*app.get("/get_customers_rentals", async function (req, res) {
    await client.connect();
    const sql_select = "select * from news_ks.customers_rentals"; //where Customer = ?
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
  // ---------------------------------------------------------------------------------------- //

  
  await client.execute("DROP TABLE IF EXISTS news_ks.customers_rentals");
  await client.execute("create table news_ks.customers_rentals (customer TEXT, rental_date timestamp,year INT, month INT, amount FLOAT,  PRIMARY KEY( (customer), year, month, rental_date))");
   ;
  const sql = `SELECT concat(concat(c.first_name," "), c.last_name) as "Customer", i.film_id, concat(concat(s.first_name," "), s.last_name) as "Staff", r.rental_id, r.rental_date, p.amount,
  YEAR(r.rental_date) as 'year', MONTH (r.rental_date) as 'month'
    FROM sakila.payment p
    inner join customer c on c.customer_id = p.customer_id
    inner join staff s on s.staff_id = p.staff_id
    inner join rental r on r.rental_id = p.payment_id
    inner join inventory i on r.inventory_id = i.inventory_id
   `;

  con.query(sql, function (err, result) {
        result.forEach(async record => {
            await client.connect();
            let sql ="insert into news_ks.customers_rentals (customer, rental_date, year, month, amount)";
            sql+= ` values('${record["Customer"]}','${new Date(record["rental_date"]).toISOString()}', ${record["year"]}, ${record["month"]}, ${record["amount"]})`;
            await client.execute(sql);
            //await client.shutdown();
        });

    });
*/
  // Execute a query
  //const rs = await client.execute("SELECT * FROM system.local");
  //console.log(`Your cluster returned ${rs.rowLength} row(s)`);
  //

  /*const createSalariesTableQuery = `
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
`;*/

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

  /*const createDepartmentsTableQuery = `
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
`;*/

  //await client.execute(createSalariesTableQuery);
  //await client.execute(createTitlesTableQuery);
  await client.execute(createEmployeesTableQuery);
  //client.execute(createDepartmentsTableQuery);
  //client.execute(createDeptManagerTableQuery);
  //client.execute(createDeptEmpTableQuery);
  let lastInsertedId = 0;
  await processarDados(lastInsertedId, client);
  await client.shutdown();
}

async function processarDados(lastInsertedId, client) {
    
  const query = `SELECT * FROM employees WHERE emp_no > ${lastInsertedId} LIMIT 1000`;
  try {
    const [results] = await con.promise().query(query);
    if (results.length === 0) {
      console.log("Nenhum dado novo encontrado.");
      return;
    }

    for (const row of results) {
      console.log("Chegou aqui");
      const insertQuery = "INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (?, ?, ?, ?, ?, ?)";
      const params = [
        row.emp_no,
        row.birth_date,
        row.first_name,
        row.last_name,
        row.gender,
        row.hire_date,
      ];

      await client.execute(insertQuery, params, { prepare: true });
      lastInsertedId = Math.max(lastInsertedId, row.emp_no);
    }

    console.log("Dados inseridos com sucesso no Cassandra.");
  } catch (error) {
    console.error("Erro ao processar dados:", error);
  }
}

run();
