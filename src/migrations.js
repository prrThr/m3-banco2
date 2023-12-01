export const employeesQuery = `SELECT * FROM employees ORDER BY emp_no LIMIT 100`;
export const employeesInsertQuery = "INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (?, ?, ?, ?, ?, ?)";
export const employeesParams = [ row.emp_no, row.birth_date, row.first_name, row.last_name, row.gender, row.hire_date ];

// -------------------------------------------------------------- //

export const departmentsQuery = "SELECT * FROM departments";
export const departmentsInsertQuery = "INSERT INTO departments (dept_no, dept_name) VALUES (?, ?)";
export const departmentsParams = [ row.dept_no, row.dept_name ];

// -------------------------------------------------------------- //

export async function transferData(tableName, connection, tableQuery, client, insertQuery, tableParams) {
  console.log(`Iniciando a transferência de dados (${tableName})...`);

  try {
    const [results] = await connection.promise().query(tableQuery);
    if (results.length === 0) {
      console.log(`Nenhum dado novo encontrado na tabela ${tableName}.`);
      return;
    }

    //results.sort((a, b) => a.emp_no - b.emp_no);

    results.forEach({
      await: client.execute(insertQuery, tableParams, { prepare: true }),
    });

    console.log(
      `Dados da tabela ${tableName} inseridos com sucesso no Cassandra.`
    );
  } catch (error) {
    console.error(`Erro ao processar dados (${tableName}):`, error);
  }
}
