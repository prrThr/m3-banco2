// Conectar ao MySQL
const mysql = require("../config/mysql");
mysql.connect(function (err) {
  if (err) throw err;
  console.log("Connection with mysql established");
});


async function transferData(req, res, client, tableName, tableQuery, insertQuery, tableParams) {
  console.log(`Iniciando a transferência de dados (${tableName})...`);
  try {
    const [results] = await mysql.promise().query(tableQuery);
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

      let i = 0;
        if (resultQuery.first === null) {
          console.log("Dado inserido com sucesso: ", row);
        } else {
          console.log("Dado já existente, não inserido: ", row);
        }
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
