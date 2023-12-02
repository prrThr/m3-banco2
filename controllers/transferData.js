// TODO: Procurar alguma maneira de importar o mysql.connect
const mysql = require("../config/mysql");
mysql.connect(function (err) {
  if (err) throw err;
  console.log("Connection with MySQL established for transfering data");
});


async function transferData(req, res, client, tableName, tableQuery, insertQuery, tableParams) {
  console.log(`Iniciando a transferência de dados (${tableName})...`);
  try {
    const [results] = await mysql.promise().query(tableQuery);
    if (results.length === 0) {
      console.log(`Nenhum dado novo encontrado na tabela ${tableName}.`);
      return;
    }

    for (const row of results) {
      var params = tableParams.map((param) => row[param]);
      await client.execute(insertQuery, params, {
        prepare: true,
      });

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
}
