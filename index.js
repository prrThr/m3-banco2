const express = require("express");
const { Client } = require("cassandra-driver");
const datastax = require("./config/cassandra");
const mysql = require("./config/mysql");
const { transferData } = require("./controllers/transferData");

const app = express();
const PORT = 9037;

// --------------------------------------------------------------------------------------- //

// Conectar ao MySQL
mysql.connect(function (err) {
  if (err) throw err;
  console.log("Connection with mysql established");
});

// Rodar o servidor de acordo com a porta PORT
let server = app.listen(PORT, () => {
  console.log("Server running in port " + PORT);
});

// Conectar ao cliente do Cassandra (Datastax)
const client = new Client({
  cloud: {
    secureConnectBundle: datastax.bundle,
  },
  credentials: {
    username: datastax.clientId,
    password: datastax.secret,
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

  //await client.execute(createSalariesTableQuery);
  //await client.execute(createTitlesTableQuery);
  //await client.execute(createEmployeesTableQuery);
  await client.execute(createDepartmentsTableQuery);
  //await client.execute(createDeptManagerTableQuery);
  //await client.execute(createDeptEmpTableQuery);
  //await processarDados(client);
  await transferData("employees", mysql, employeesQuery, client, employeesInsertQuery, employeesParams);
}

// ----------------------------------------------------------------------------------- //

async function closeAll(client, server) {
  client.shutdown();
  server.close();
}
// ----------------------------------------------------------------------------------- //

run();
