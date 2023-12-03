// TODO: Procurar alguma maneira de importar o mysql.connect
const mysql = require("../config/mysql");
mysql.connect(function (err) {
  if (err) throw err;
  console.log("Connection with MySQL established for data synchrony");
});

async function syncData(req, res, client, tables) {
  try {
    for (const table of tables) {
      const { tableName, createTable, tableQuery, insertQuery, createIndex, tableParams } =
        table;

      console.log(""); // Pular linha
      try {
        await client.execute(createTable);
        console.log(`Tabela ${tableName} criada.`);
        await client.execute(createIndex);
        console.log(`Index criado.`);
      } catch (error) {
        console.error(`Erro ao criar tabela "${tableName}":`, error);
      }

      console.log(`Iniciando a sincronia de dados (${tableName})...`);

      const [results] = await mysql.promise().query(tableQuery);

      if (results.length === 0) {
        console.log(`Nenhum dado novo encontrado na tabela ${tableName}.`);
        continue;
      }

      let i = 0;
      for (const row of results) {
        const params = tableParams.map((param) => row[param]);
        await client.execute(insertQuery, params, {
          prepare: true,
        });
        console.log("+", i);
        i++;
      }

      console.log(
        `Dados da tabela ${tableName} processados com sucesso no Cassandra.`
      );
    }

    return res.status(200).json({ message: "Dados processados com sucesso." });
  } catch (error) {
    console.error("Erro ao processar dados:", error);
    return res.status(500).json({ error: "Erro ao processar dados." });
  }
}

module.exports = {
  syncData
};
