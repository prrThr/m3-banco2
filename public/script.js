document.getElementById("btnTransferir").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/transfer-data", {
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
    console.error("Erro ao transferir dados:", error);
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = "Erro ao transferir dados.";
  }
});

// ------------------------------------------------------------------------------------------ //

document.getElementById("btnMostrar").addEventListener("click", async () => {
  try {
    const selectedTable = document.getElementById("tableSelect").value;

    if (!selectedTable) {
      return;
    }

    const response = await fetch(`/api/get_${selectedTable}`, {
      method: "GET",
    });

    const data = await response.json();

    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = JSON.stringify(data);
  } catch (error) {
    console.error("Erro ao mostrar dados:", error);
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = "Erro ao mostrar dados.";
  }
});
