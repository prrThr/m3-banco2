async function selectAll(req, res, client, tableName) {
  try {
    await client.connect();
  } catch (error) {
    console.log("CLIENT não conseguiu conectar: " + error);
  }

  const cql_select = `SELECT * FROM ${tableName}`;
  let query = cql_select;
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

// ----------------------------------------------------------------------------------------- //

async function employeesByManager(req, res, client, manager) {
  try {
    await client.connect();
  } catch (error) {
    console.log("CLIENT não conseguiu conectar: " + error);
  }

  const cql_select = `SELECT * FROM employees WHERE dept_name = '${dept_name}';`;
  let query = cql_select;
  let parameters = [];

  try {
    let result = await client.execute(query, parameters);
    console.log("RESULT: ", cql_select)
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
    console.error(`Erro ao executar a consulta:`, error);
    res
      .status(500)
      .json({ error: `Erro ao executar a consulta.` });
  }
}
// ----------------------------------------------------------------------------------------- //

async function employeesByDepartment(req, res, client, dept_name, from_date, to_date) {

  try {
    await client.connect();
  } catch (error) {
    console.log("CLIENT não conseguiu conectar: " + error);
  }

  console.log("Request dept_name: ", dept_name);
  console.log("Request from_date", from_date);
  console.log("Request to_date", to_date);

  const cql_select = `SELECT * FROM employees WHERE dept_name = '${dept_name}' AND from_date >= '${from_date}' AND to_date <= '${to_date}';`;
  let query = cql_select;
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
    console.error(`Erro ao executar a consulta:`, error);
    res
      .status(500)
      .json({ error: `Erro ao executar a consulta.` });
  }
}

// ----------------------------------------------------------------------------------------- //

async function averageSalary(req, res, client, dept_no, salary) {}

// ----------------------------------------------------------------------------------------- //

module.exports = {
  selectAll,
  employeesByManager,
  employeesByDepartment,
  averageSalary
};

