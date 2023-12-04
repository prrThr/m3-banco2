const datastax = require("../config/cassandra");

async function syncData(req, res, client, mysql, tables) {
  try {
    for (const table of tables) {
      const { tableName, createTable, sqlQuery, insertQuery, tableParams } =
        table;

      

      const resultTableExists = await client.execute(
        `SELECT table_name FROM system_schema.tables 
          WHERE keyspace_name = '${datastax.keyspace}' 
          AND table_name = '${tableName}';`
      );
      const tableExists = resultTableExists.rowLength > 0;
      let countValue;

      console.log(""); // Pular linha
      try {
        if (tableExists) {
          console.log(`Tabela ${tableName} já existente.`);
          const tableCount = await client.execute(`SELECT COUNT (*) FROM ${tableName};`);
          countValue = tableCount.rows[0]["count"].toInt();
        } else {
          await client.execute(createTable);
          console.log(`Tabela ${tableName} criada.`);

          if (tableName === "employees") {
            await client.execute("CREATE INDEX ON employees (dept_no);");
            await client.execute("CREATE INDEX ON employees (dept_name);");
            await client.execute("CREATE INDEX ON employees (from_date);");
            await client.execute("CREATE INDEX ON employees (to_date);");
          } else if (tableName === "employees_salaries") {
            await client.execute("CREATE INDEX ON employees_salaries (salary)");
            await client.execute("CREATE INDEX ON employees_salaries (dept_no)");
            console.log(`Indices criados`);
          }
        }
      } catch (error) {
        console.error(`Erro ao criar tabela "${tableName}":`, error);
      }

      if (countValue > 0) {
        console.log(`Já existem dados na tabela ${tableName}. Sincronia de dados não feita.`);
        
      } else {
        console.log(`Iniciando a sincronia de dados (${tableName})...`);

        const [results] = await mysql.promise().query(sqlQuery);

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
    }

    return res.status(200).json({ message: "Dados processados com sucesso." });
  } catch (error) {
    console.error("Erro ao processar dados:", error);
    return res.status(500).json({ error: "Erro ao processar dados." });
  }
}

module.exports = {
  syncData,
};
