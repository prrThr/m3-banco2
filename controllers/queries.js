// a) Retorne todos os employees dado o nome de determinado manager.
async function employeesByManager(req, res, client, dept_no) {
  try {
    await client.connect();
  } catch (error) {
    console.log("CLIENT não conseguiu conectar: " + error);
  }

  const query = `SELECT * FROM m3.employees WHERE emp_no IN (SELECT emp_no FROM m3.dept_manager WHERE dept_no = ${dept_no});`;
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
    console.error(`Erro ao executar a consulta (${dept_no}):`, error);
    res
      .status(500)
      .json({ error: `Erro ao executar a consulta (${dept_no}).` });
  }
}

// -----------------------------------------------------------------------------//

// b) Dado o nome de um departamento, retorne todos os employees vinculados
//    a este departamento em determinada data.
async function employeesByDepartment(req, res, client, dept_no, from_date, to_date) {
    try {
      await client.connect();
    } catch (error) {
      console.log("CLIENT não conseguiu conectar: " + error);
    }
  
    const query = `SELECT * FROM m3.employees WHERE emp_no IN (SELECT emp_no FROM m3.dept_emp WHERE dept_no = ${dept_no} AND from_date <= ${from_date} AND to_date >= ${to_date});`;
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
      console.error(`Erro ao executar a consulta (${dept_no}):`, error);
      res
        .status(500)
        .json({ error: `Erro ao executar a consulta (${dept_no}).` });
    }
  }


// -----------------------------------------------------------------------------//

// c) Retorne a média salarial de todos os employees por departamento.
//    * O retorno da consulta deve retornar todos os campos (6 ao total)
//    presentes na tabela employee do modelo relacional.
async function averageSalary(req, res, client) {
    try {
      await client.connect();
    } catch (error) {
      console.log("CLIENT não conseguiu conectar: " + error);
    }
  
    const query = `SELECT dept_no, AVG(salary) as average_salary FROM m3.salaries GROUP BY dept_no;`;
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
      console.error(`Erro ao executar a consulta (${dept_no}):`, error);
      res
        .status(500)
        .json({ error: `Erro ao executar a consulta (${dept_no}).` });
    }
  }



// -----------------------------------------------------------------------------//

module.exports = {
    employeesByDepartment,
    employeesByManager,
    averageSalary
};
