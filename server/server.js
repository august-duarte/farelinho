const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// --- A MÁGICA ESTÁ AQUI ---
// Isso faz o servidor entender que a pasta 'client' é onde está o seu site.
app.use(express.static(path.join(__dirname, '../client')));

const lerReceitas = () => {
  try {
    const dados = fs.readFileSync(path.join(__dirname, 'info.json'), 'utf-8');
    return JSON.parse(dados);
  } catch (err) {
    return [];
  }
};

// Rotas da API (continuam iguais)
app.get('/api/receitas', (req, res) => {
  const receitas = lerReceitas();
  const busca = req.query.q ? req.query.q.toLowerCase() : '';
  const filtradas = receitas.filter(r =>
    r.name.toLowerCase().includes(busca) || r.description.toLowerCase().includes(busca)
  );
  res.json(filtradas);
});

app.get('/api/receitas/:id', (req, res) => {
  const receitas = lerReceitas();
  const receita = receitas.find(r => r.id == req.params.id);
  if (receita) res.json(receita);
  else res.status(404).json({ mensagem: "Não encontrada" });
});

// Agora o servidor abre o site na porta 3000!
app.listen(port, () => {
  console.log(`🚀 Site e API rodando em http://localhost:${port}`);
});