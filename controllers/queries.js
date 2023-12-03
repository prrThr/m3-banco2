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
async function employeesByDepartment(
  req,
  res,
  client,
  dept_no,
  from_date,
  to_date
) {
  try {
    await client.connect();
  } catch (error) {
    console.log("CLIENT não conseguiu conectar: " + error);
  }

  const query = `
    SELECT * 
    FROM employees 
    WHERE emp_no IN (
      SELECT emp_no 
      FROM dept_emp 
      WHERE dept_no = ? AND from_date <= ? AND to_date >= ?
    )`;

  const parameters = [dept_no, from_date, to_date];

  try {
    const result = await client.execute(query, parameters);

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
    res.status(500).json({ error: `Erro ao executar a consulta (${dept_no}).` });
  }
}



// -----------------------------------------------------------------------------//

// c) Retorne a média salarial de todos os employees por departamento.
//    * O retorno da consulta deve retornar todos os campos (6 ao total)
//    presentes na tabela employee do modelo relacional.
async function averageSalary(req, res, client) {
  try {
    const allEmployeesQuery = "SELECT emp_no, dept_no FROM dept_emp";
    const allEmployeesResult = await client.execute(allEmployeesQuery);
    const departmentData = {};

    async function getSalaries(emp_no) {
      const salaryQuery = "SELECT salary FROM salaries WHERE emp_no = ?";
      const salaryResult = await client.execute(salaryQuery, [emp_no], { prepare: true });
      return salaryResult.rows.map((row) => row.salary);
    }

    for (const row of allEmployeesResult.rows) {
      const emp_no = row.emp_no;
      const dept_no = row.dept_no;

      if (!departmentData[dept_no]) {
        departmentData[dept_no] = {
          totalSalary: 0,
          count: 0,
        };
      }

      const salaries = await getSalaries(emp_no);
      const totalSalary = salaries.reduce((total, salary) => total + salary, 0);

      departmentData[dept_no].totalSalary += totalSalary;
      departmentData[dept_no].count++;
    }

    const averageSalariesByDepartment = {};
    const departments = Object.keys(departmentData).sort();

    let logInfo = "DEPARTMENT DATA:\n";

    departments.forEach((dept) => {
      logInfo += `Departament: ${dept}\n`;
      logInfo += `Total salary: ${departmentData[dept].totalSalary}\n`;
      logInfo += `Count: ${departmentData[dept].count}\n\n`;
    });

    console.log(logInfo);

    departments.forEach((dept_no) => {
      averageSalariesByDepartment[dept_no] =
        departmentData[dept_no].totalSalary / departmentData[dept_no].count;
    });

    res.status(200).json({
      departmentData: departmentData,
      averageSalaryByDepartment: averageSalariesByDepartment,
    });
  } catch (error) {
    console.error("Erro ao executar a consulta:", error);
    res.status(500).json({ error: "Erro ao executar a consulta." });
  }
}


// -----------------------------------------------------------------------------//

module.exports = {
  employeesByDepartment,
  employeesByManager,
  averageSalary,
};
