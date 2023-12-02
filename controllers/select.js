async function selectAll(req, res, client, tableName) {
  try {
    await client.connect();
  } catch (error) {
    console.log("CLIENT não conseguiu conectar: " + error);
  }

  const sql_select = `SELECT * FROM ${tableName}`;
  let query = sql_select;
  let parameters = [];

  try {
    let result = await client.execute(query, parameters);
    console.log("total sync: ", result.rows.length);

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST,GET,OPTIONS,PUT,DELETE,HEAD"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-PINGOTHER,Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader("Access-Control-Max-Age", "1728000");

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(`Erro ao executar a consulta (${tableName}):`, error);
    res
      .status(500)
      .json({ error: `Erro ao executar a consulta (${tableName}).` });
  }
}

module.exports = {
  selectAll,
};
