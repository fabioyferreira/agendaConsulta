const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// conexão com o banco
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "garfanhoto",
  database: "agendamento"
});

db.connect(err => {
  if (err) {
    console.error("Erro ao conectar:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

// rota para salvar consulta
app.post("/agendar", (req, res) => {
  const { nome, email, telefone, especialidade, data, hora } = req.body;

  const sql = `
    INSERT INTO consultas 
    (nome, email, telefone, especialidade, data, hora)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [nome, email, telefone, especialidade, data, hora], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao salvar");
    }

    res.send("Consulta agendada com sucesso!");
  });
});

// rota para ver consulta
app.get("/consultas", (req, res) => {
  db.query("SELECT * FROM consultas", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});


//// rota para deletar consulta
app.delete("/consultas/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM consultas WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao excluir");
    }

    res.send("Consulta excluída com sucesso!");
  });
});


//rota editar consulta

app.put("/consultas/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, especialidade, data, hora } = req.body;

  const sql = `
    UPDATE consultas 
    SET nome = ?, email = ?, telefone = ?, especialidade = ?, data = ?, hora = ?
    WHERE id = ?
  `;

  db.query(sql, [nome, email, telefone, especialidade, data, hora, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao atualizar");
    }

    res.send("Consulta atualizada com sucesso!");
  });
});


//buscar consulta

app.get("/consultas/busca", (req, res) => {
  const { q } = req.query; // pega o termo digitado no frontend
  if (!q) return res.status(400).send("Informe um termo de pesquisa");

  const termo = `%${q}%`; // para LIKE
  const sql = `
    SELECT * FROM consultas
    WHERE nome LIKE ? OR especialidade LIKE ? OR data LIKE ?
  `;

  db.query(sql, [termo, termo, termo], (err, results) => {
    if (err) {
      console.error("Erro na query de busca:", err);
      return res.status(500).send("Erro ao buscar consultas");
    }
    res.json(results);
  });
});







// iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});







