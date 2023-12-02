async function transferData(req, res) {
  const tableName = "departments"; // Substitua pelo nome da tabela conforme necessário

  console.log(`Iniciando a transferência de dados (${tableName})...`);

  try {
    const [results] = await req.mysqlConnection.promise().query(`SELECT * FROM ${tableName}`);

    if (results.length === 0) {
      console.log(`Nenhum dado novo encontrado na tabela ${tableName}.`);
      return res.status(200).json({ message: `Nenhum dado novo encontrado na tabela ${tableName}.` });
    }

    for (const row of results) {
      const params = [];
      await req.cassandraClient.execute(
        "INSERT INTO departments (dept_no, dept_name) VALUES (?, ?) IF NOT EXISTS",
        params,
        { prepare: true }
      );

      console.log("Dado inserido com sucesso: ", row);
    }

    console.log(`Dados da tabela ${tableName} processados com sucesso no Cassandra.`);
    return res.status(200).json({ message: `Dados da tabela ${tableName} processados com sucesso no Cassandra.` });
  } catch (error) {
    console.error(`Erro ao processar dados (${tableName}):`, error);
    return res.status(500).json({ error: `Erro ao processar dados (${tableName}).` });
  }
}

module.exports = {
  transferData
};