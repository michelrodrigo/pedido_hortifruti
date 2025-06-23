import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/enviar-pedido', async (req, res) => {
  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzcdTYjCBs840_xJqrroalDoQ1SrxUXHEWOQyjEjEFzje5ehcvXn2_N6QulLnE3mJnFfQ/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      }
    );

    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error('Erro ao enviar para o Apps Script:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy rodando em http://localhost:${PORT}`);
});
