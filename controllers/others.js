

// ---------------------------------------------------------------------------------- //

async function useM3(req, res) {
  try {
    await client.execute("use m3");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro na operação "use m3":', error);
    res
      .status(500)
      .json({ success: false, error: 'Erro na operação "use m3".' });
  }
}

// ---------------------------------------------------------------------------------- //

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
  useM3,
  quit
}