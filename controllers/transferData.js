// TODO: Procurar alguma maneira de importar o mysql.connect
const mysql = require("../config/mysql");
mysql.connect(function (err) {
  if (err) throw err;
  console.log("Connection with MySQL established for transfering data");
});

async function transferData(req, res, client, tables) {
  try {
    for (const table of tables) {
      const { tableName, createTable, tableQuery, insertQuery, tableParams } =
        table;

      try {
        await client.execute(createTable);
        console.log(`Tabela ${tableName} criada.`);
      } catch (error) {
        console.error(`Erro ao criar tabela "${tableName}":`, error);
      }

      console.log(`Iniciando a transferência de dados (${tableName})...`);

      const [results] = await mysql.promise().query(tableQuery);

      if (results.length === 0) {
        console.log(`Nenhum dado novo encontrado na tabela ${tableName}.`);
        continue;
      }

      for (const row of results) {
        const params = tableParams.map((param) => row[param]);
        await client.execute(insertQuery, params, {
          prepare: true,
        });

        //console.log("Dado inserido com sucesso: ", row);
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
  transferData,
};
