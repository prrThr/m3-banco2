async function createEmployeesTable(req, res) {
  try {
    await client.execute(createEmployeesTableQuery);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao criar tabela "Employees":', error);
    res
      .status(500)
      .json({ success: false, error: 'Erro ao criar tabela "Employees".' });
  }
}

// ---------------------------------------------------------------------------------- // 

async function createDepartmentsTable(req, res) {
  try {
    await client.execute(createDepartmentsTableQuery);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao criar tabela "Departments":', error);
    res
      .status(500)
      .json({ success: false, error: 'Erro ao criar tabela "Departments".' });
  }
}

// ... Seu código posterior ...

module.exports = {
  createEmployeesTable,
  createDepartmentsTable,
};
