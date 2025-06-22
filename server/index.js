import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/pedidos', (req, res) => {
  console.log('Pedido recebido:', req.body);
  // aqui você vai gravar em Google Sheets, banco, etc.
  res.status(200).json({ ok: true });
});

app.listen(5000, () => console.log('Server rodando na porta 5000'));