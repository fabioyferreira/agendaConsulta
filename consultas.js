


//Adicionar botão "Excluir" na tabela

async function carregarConsultas() {
  try {
    const response = await fetch("http://localhost:3000/consultas");
    const consultas = await response.json();

    const tbody = document.querySelector("#tabela-consultas tbody");
    tbody.innerHTML = "";

    consultas.forEach(c => {
      const linha = `
        <tr>
          <td>${c.nome}</td>
          <td>${c.email}</td>
          <td>${c.telefone}</td>
          <td>${c.especialidade}</td>
          <td>${c.data}</td>
          <td>${c.hora}</td>
          <td>
            <button onclick="excluirConsulta(${c.id})">Excluir</button>
          </td>
          <td>
          <button onclick="editarConsulta(${c.id}, '${c.nome}', '${c.email}', '${c.telefone}', '${c.especialidade}', '${c.data}', '${c.hora}')">Editar</button>
          </td>
        </tr>
      `;
      tbody.innerHTML += linha;
    });

  } catch (error) {
    alert("Erro ao carregar consultas");
  }
}

carregarConsultas();

//Função para excluir

async function excluirConsulta(id) {
  const confirmar = confirm("Tem certeza que deseja excluir?");

  if (!confirmar) return;

  try {
    const response = await fetch(`http://localhost:3000/consultas/${id}`, {
      method: "DELETE"
    });

    const msg = await response.text();
    alert(msg);

    carregarConsultas(); // atualiza tabela
  } catch (error) {
    alert("Erro ao excluir");
  }
}






async function editarConsulta(id, nome, email, telefone, especialidade, data, hora) {

  const novoNome = prompt("Nome:", nome);
  const novoEmail = prompt("Email:", email);
  const novoTelefone = prompt("Telefone:", telefone);
  const novaEspecialidade = prompt("Especialidade:", especialidade);
  const novaData = prompt("Data (YYYY-MM-DD):", data);
  const novaHora = prompt("Hora (HH:MM):", hora);

  if (!novoNome) return;

  const dados = {
    nome: novoNome,
    email: novoEmail,
    telefone: novoTelefone,
    especialidade: novaEspecialidade,
    data: novaData.split("T")[0],
    hora: novaHora
  };

  try {
    const response = await fetch(`http://localhost:3000/consultas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    const msg = await response.text();
    alert(msg);

    carregarConsultas(); // atualiza tabela

  } catch (error) {
    alert("Erro ao atualizar");
  }
}






async function buscarConsultas() {
  const termo = document.getElementById("busca").value;

  if (!termo) {
    carregarConsultas(); // mostra todas se campo vazio
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/consultas/busca?q=${encodeURIComponent(termo)}`);
    if (!response.ok) throw new Error("Erro na requisição");
    const dados = await response.json();
    renderizarTabela(dados); // mesma função que atualiza a tabela
  } catch (err) {
    console.error(err);
    alert("Erro ao buscar consultas");
  }
}











// Função para renderizar a tabela
function renderizarTabela(consultas) {
  const tbody = document.querySelector("#tabela-consultas tbody");
  tbody.innerHTML = "";

  consultas.forEach(c => {
    const linha = `
      <tr>
        <td>${c.nome}</td>
        <td>${c.email}</td>
        <td>${c.telefone}</td>
        <td>${c.especialidade}</td>
        <td>${c.data.split("T")[0]}</td>
        <td>${c.hora}</td>
        <td><button onclick="excluirConsulta(${c.id})">Excluir</button></td>
        <td><button onclick='editarConsulta(
          ${c.id},
          ${JSON.stringify(c.nome)},
          ${JSON.stringify(c.email)},
          ${JSON.stringify(c.telefone)},
          ${JSON.stringify(c.especialidade)},
          ${JSON.stringify(c.data)},
          ${JSON.stringify(c.hora)}
        )'>Editar</button></td>
      </tr>
    `;
    tbody.innerHTML += linha;
  });
}

// Carrega todas consultas
async function carregarConsultas() {
  try {
    const response = await fetch("http://localhost:3000/consultas");
    const consultas = await response.json();
    renderizarTabela(consultas);
  } catch (error) {
    alert("Erro ao carregar consultas");
  }
}

carregarConsultas();