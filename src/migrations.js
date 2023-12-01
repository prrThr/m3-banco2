export const employeesQuery = `SELECT * FROM employees ORDER BY emp_no LIMIT 100`;
export const employeesInsertQuery =
  "INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (?, ?, ?, ?, ?, ?)";
export const employeesParams = ['emp_no', 'birth_date', 'first_name', 'last_name', 'gender', 'hire_date'];

// -------------------------------------------------------------- //

export const departmentsQuery = "SELECT * FROM departments";
export const departmentsInsertQuery =
  "INSERT INTO departments (dept_no, dept_name) VALUES (?, ?)";
export const departmentsParams = ['dept_no', 'dept_name'];

// -------------------------------------------------------------- //

export async function transferData(tableName, connection, tableQuery, client, insertQuery, tableParams) {
  console.log(`Iniciando a transferência de dados (${tableName})...`);

  try {
    const [results] = await connection.promise().query(tableQuery);
    if (results.length === 0) {
      console.log(`Nenhum dado novo encontrado na tabela ${tableName}.`);
      return;
    }

    for (const row of results) {
      var params = tableParams.map(param => row[param]); // Use row[param]
      await client.execute(insertQuery, params, { prepare: true });
    }

    console.log(
      `Dados da tabela ${tableName} inseridos com sucesso no Cassandra.`
    );
  } catch (error) {
    console.error(`Erro ao processar dados (${tableName}):`, error);
  }
}
