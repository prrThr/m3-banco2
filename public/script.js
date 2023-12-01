document.getElementById("btnTransferir").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/get_employees"); // Rota da API que você deseja chamar
    const data = await response.json();

    // Atualize a UI com os dados recebidos
    const mensagemElement = document.getElementById("Dados transferido HTML");
    mensagemElement.textContent = JSON.stringify(data);
  } catch (error) {
    console.error("Erro ao transferir dados:", error);
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = "Erro ao transferir dados.";
  }
});

// ------------------------------------------------------------------------------------------ //

document.getElementById("btnUseM3").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/use-m3"); // Adapte a rota conforme necessário
    const data = await response.json();

    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = 'Operação "use m3" concluída.';
  } catch (error) {
    console.error('Erro na operação "use m3":', error);
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = 'Erro na operação "use m3".';
  }
});

// ------------------------------------------------------------------------------------------ //

document
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
