async function transferData(tableName, connection, tableQuery, client, insertQuery, tableParams) {
  console.log(`Iniciando a transferência de dados (${tableName})...`);

  try {
    const [results] = await connection.promise().query(tableQuery);
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

      /*let i = 0;
        if (resultQuery.first === null) {
          console.log("Dado inserido com sucesso: ", row);
        } else {
          console.log("Dado já existente, não inserido: ", row);
        }*/
    }

    console.log(
      `Dados da tabela ${tableName} inseridos com sucesso no Cassandra.`
    );
  } catch (error) {
    console.error(`Erro ao processar dados (${tableName}):`, error);
  }
}

module.exports = {
  transferData
}
