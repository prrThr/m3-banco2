async function quit(req, res) {
  try {
    await req.cassandraClient.shutdown();
    console.log("Closed connection to Cassandra");
  } catch (error) {
    console.error("Error closing connection to Cassandra:", error);
  }

  req.server.close(() => {
    console.log("Server closed");
    process.exit(); // Finalizar o processo Node.js
  });

  res.status(200).send("Server shutting down...");
}

module.exports = {
  quit
};


module.exports = {
  quit
}