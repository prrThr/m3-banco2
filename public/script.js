document.getElementById("btnTransferir").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/transfer-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Adicione dados ao corpo da solicitação, se necessário
      body: JSON.stringify({ /* seus dados aqui */ }),
    });

    const data = await response.json();

    // Atualize a UI com os dados recebidos
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = JSON.stringify(data);
  } catch (error) {
    console.error("Erro ao transferir dados:", error);
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = "Erro ao transferir dados.";
  }
});


// ------------------------------------------------------------------------------------------ //

/*document
  .getElementById("btnCreateEmployeesTable")
  .addEventListener("click", async () => {
    try {
      const response = await fetch("/api/create-employees-table"); // Adapte a rota conforme necessário
      const data = await response.json();

      const mensagemElement = document.getElementById("mensagem");
      mensagemElement.textContent = 'Tabela "Employees" criada com sucesso.';
    } catch (error) {
      console.error('Erro ao criar tabela "Employees":', error);
      const mensagemElement = document.getElementById("mensagem");
      mensagemElement.textContent = 'Erro ao criar tabela "Employees".';
    }
  });

// ------------------------------------------------------------------------------------------ //

document
  .getElementById("btnCreateDepartmentsTable")
  .addEventListener("click", async () => {
    try {
      const response = await fetch("/api/create-departments-table"); // Adapte a rota conforme necessário
      const data = await response.json();

      const mensagemElement = document.getElementById("mensagem");
      mensagemElement.textContent = 'Tabela "Departments" criada com sucesso.';
    } catch (error) {
      console.error('Erro ao criar tabela "Departments":', error);
      const mensagemElement = document.getElementById("mensagem");
      mensagemElement.textContent = 'Erro ao criar tabela "Departments".';
    }
  });
*/