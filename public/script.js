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

    const response = await fetch(`/api/get_${selectedTable}`);
    const data = await response.json();

    const resultsContainer = document.createElement("div");
    resultsContainer.setAttribute("id", "resultsContainer");

    const totalSyncElement = document.createElement("p");
    totalSyncElement.textContent = `Total results: ${data.length}`;
    resultsContainer.appendChild(totalSyncElement);

    data.forEach((row) => {
      const rowElement = document.createElement("p");
      rowElement.textContent = JSON.stringify(row);
      resultsContainer.appendChild(rowElement);
    });

    const btnMostrar = document.getElementById("btnMostrar");
    btnMostrar.parentNode.insertBefore(
      resultsContainer,
      btnMostrar.nextSibling
    );
  } catch (error) {
    console.error("Erro ao mostrar dados:", error);
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = "Erro ao mostrar dados.";
  }
});

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
