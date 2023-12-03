document.getElementById("btnSync").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/sync-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Adicione dados ao corpo da solicitação, se necessário
      body: JSON.stringify({
        /* seus dados aqui */
      }),
    });

    const data = await response.json();

    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = JSON.stringify(data);
  } catch (error) {
    console.error("Erro ao sincronizar dados:", error);
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = "Erro ao sincronizar dados.";
  }
});

// ------------------------------------------------------------------------------------------ //

document.getElementById("btnMostrar").addEventListener("click", async () => {
  try {
    const selectedTable = document.getElementById("tableSelect").value;

    window.location.href = `/api/get_${selectedTable}`;

  } catch (error) {
    console.error("Erro ao mostrar dados:", error);
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = "Erro ao mostrar dados.";
  }
});

// ------------------------------------------------------------------------------------------ //

document.getElementById('btnEmployeesByManager').addEventListener('click', employeesByManagerHandler);
document.getElementById('btnEmployeesByDepartment').addEventListener('click', employeesByDepartmentHandler);
document.getElementById('btnAverageSalary').addEventListener('click', averageSalaryHandler);

function employeesByManagerHandler() {
    const managerId = prompt("Digite o ID do Manager:");
    if (managerId !== null) {
        redirectToApiRoute(`employees_by_manager?managerId=${managerId}`);
    }
}

function employeesByDepartmentHandler() {
  const dept_no = document.getElementById('dept_no').value;
  const from_date = document.getElementById('from_date').value;
  const to_date = document.getElementById('to_date').value;

  if (dept_no && from_date && to_date) {
      redirectToApiRoute(`employees_by_department?dept_no=${dept_no}&from_date=${from_date}&to_date=${to_date}`);
  } else {
      alert('Preencha todos os campos antes de clicar no botão');
  }
}
function averageSalaryHandler() {
    redirectToApiRoute('average_salary');
}

function redirectToApiRoute(route) {
    const apiUrl = `http://localhost:9037/api/${route}`;
    window.location.href = apiUrl;
}


// ------------------------------------------------------------------------------------------ //

async function desligarProjeto() {
  try {
    const response = await fetch("/api/quit", {
      method: "GET",
    });

    const mensagemElement = document.getElementById("mensagem");

    if (response.ok) {
      mensagemElement.textContent = "Desligando o projeto...";

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      mensagemElement.textContent = `Erro ao desligar o projeto. Status: ${response.status}`;
    }

    return response.status;
  } catch (error) {
    console.error("Erro ao desligar o projeto:", error);
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = "Erro ao desligar o projeto.";

    return 500; // Erro interno do servidor
  }
}
