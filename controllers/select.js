
// ---------------------------------------- //

async function selectEmployees (req, res, client) {
  try {
    await client.connect();
  } catch (error) {
    console.log("CLIENT não conseguiu conectar: " + error);
  }

  const sql_select = "select * from employees";
  let query = sql_select;
  let parameters = []; //req.query.customer
  let result = await client.execute(query, parameters);
  console.log("total sync: ", result.rows.length);
  //CORS
  res.status(200);
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
  res.send(JSON.stringify(result.rows));
}

// ---------------------------------------------------------------------------------- // 

async function selectDepartments (req, res, client) {
  try {
    await client.connect();
  } catch (error) {
    console.log("CLIENT não conseguiu conectar: " + error);
  }
  const sql_select = "select * from departments";
  let query = sql_select;
  let parameters = [];
  let result = await client.execute(query, parameters);
  console.log("total sync: ", result.rows.length);
  //CORS
  res.status(200);
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
  res.send(JSON.stringify(result.rows));
};

// ---------------------------------------------------------------------------------- // 

module.exports = {
  selectEmployees,
  selectDepartments
}