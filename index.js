const express = require("express");
const { Client } = require("cassandra-driver");
const datastax = require("./config/cassandra");
const mysql = require("./config/mysql");
const apiRoutes = require("./routes/apiRoutes")
const path = require('path');

const app = express();
const PORT = 9037;
const keyspace = datastax.keyspace

// --------------------------------------------------------------------------------------- //

// Conectar ao MySQL
// mysql.connect(function (err) {
//   if (err) throw err;
//   console.log("Connection with mysql established");
// });

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
// Middlewares
app.use((req, res, next) => {
  req.cassandraClient = client;
  req.server = server;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configurar as rotas da API
app.use('/api', apiRoutes);

// ---------------------------------------------------------------------------------------- //

let server = app.listen(PORT, async () => {
  try {
    await client.connect();
    console.log("Connected to Cassandra");

    await client.execute(`USE ${keyspace}`);
    console.log(`Using keyspace ${keyspace}`);
  } catch (error) {
    console.error("Error connecting to Cassandra:", error);
    server.close();
  }
  console.log("Server running in port " + PORT);
});

