listaConsultas = consultas;
renderizarTabela(consultas);


async function buscarConsultas() {
  const termo = document.getElementById("busca").value;

  const response = await fetch(`http://localhost:3000/consultas/busca?q=${termo}`);
  const dados = await response.json();

  renderizarTabela(dados);
}



function filtrarConsultas() {
  const termo = document.getElementById("busca").value.toLowerCase();

  const filtradas = listaConsultas.filter(c =>
    c.nome.toLowerCase().includes(termo) ||
    c.especialidade.toLowerCase().includes(termo) ||
    c.data.includes(termo)
  );

  renderizarTabela(filtradas);
}