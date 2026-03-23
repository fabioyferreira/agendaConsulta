
document.getElementById("form-agendamento").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  const dados = {
    nome: formData.get("nome"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    especialidade: formData.get("especialidade"),
    data: formData.get("data"),
    hora: formData.get("hora")
  };




  

  try {
    const response = await fetch("http://localhost:3000/agendar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    const msg = await response.text();
    alert(msg);

    this.reset();
  } catch (error) {
    alert("Erro ao conectar com o servidor");
  }
});




document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br',

//Clique no calendário para agendar
dateClick: function(info) {
  alert("Selecionou: " + info.dateStr);
},


//Visualização semanal (melhor para clínicas)
//initialView: 'timeGridWeek',

//Cores por especialidade
color: 'blue',





    

    events: async function(fetchInfo, successCallback, failureCallback) {
      try {
        const response = await fetch("http://localhost:3000/consultas");
        const data = await response.json();

        const eventos = data.map(c => ({
          title: c.nome + " - " + c.especialidade,
          start: c.data + "T" + c.hora
        }));

        successCallback(eventos);
      } catch (error) {
        failureCallback(error);
      }
    }
  });

  calendar.render();


});



























//document.getElementById("form-agendamento").addEventListener("submit", function(e) {
 // e.preventDefault();

  //alert("Consulta agendada com sucesso!");
 // console.log("Efetuada!")

  //this.reset();
//});