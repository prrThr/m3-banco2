const express = require("express");
const { Client } = require("cassandra-driver");
const datastax = require("./config/cassandra");
const mysql = require("./config/mysql");
const apiRoutes = require("./routes/apiRoutes")
const path = require('path');

const app = express();
const PORT = 9037;

// --------------------------------------------------------------------------------------- //

// Conectar ao MySQL
mysql.connect(function (err) {
  if (err) throw err;
  console.log("Connection with mysql established");
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
app.use((req, res, next) => {
  req.cassandraClient = client;
  req.server = server;
  next();
});


// Rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configurar as rotas da API
app.use('/api', apiRoutes);

// ---------------------------------------------------------------------------------------- //

// Rodar o servidor de acordo com a porta PORT
app.use('/api', apiRoutes);

// Rodar o servidor de acordo com a porta PORT
let server = app.listen(PORT, async () => {
  try {
    // Conectar ao Cassandra
    await client.connect();
    console.log("Connected to Cassandra");

    // Executar o comando USE m3
    await client.execute("USE m3");
    console.log("Using keyspace 'm3'");
  } catch (error) {
    console.error("Error connecting to Cassandra:", error);
    // Encerrar o servidor se houver um erro na conexão com o Cassandra
    server.close();
  }
  console.log("Server running in port " + PORT);
});

