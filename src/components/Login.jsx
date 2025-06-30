import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 adicionado

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); // 👈 usado para redirecionar
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
	setLoading(true); // 🌀 inicia o loading
    try {
      const resp = await fetch('/.netlify/functions/login-cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          senha,
          acao: 'login' // 👈 importante
        }),
      });

      const json = await resp.json();
      if (json.success) {
        const cliente = {
          nome: json.nome,
          telefone: json.telefone,
          endereco: json.endereco,
        };

        localStorage.setItem('cliente', JSON.stringify(cliente));

        navigate('/'); // 👈 redireciona para a página de pedido
      } else {
        alert('❌ Login inválido');
      }
    } catch (err) {
      alert('❌ Erro: ' + err.message);
    } finally {
		setLoading(false); // ✅ encerra o loading mesmo com erro
	  }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        required
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit" disabled={loading}>
		  {loading ? (
			<>
			  <span className="spinner" /> Entrando...
			</>
		  ) : (
			'Entrar'
		  )}
		</button>
    </form>
  );
}
