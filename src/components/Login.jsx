import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLoginSucesso }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await fetch('/.netlify/functions/login-cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          senha,
          acao: 'login',
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

        // 👉 atualiza o estado global com os dados do cliente
        if (onLoginSucesso) {
          onLoginSucesso(cliente);
        }

        navigate('/');
      } else {
        alert('❌ Login inválido. Se você esqueceu seu email cadastrado ou senha, entre em contato conosco.');
      }
    } catch (err) {
      alert('❌ Erro: ' + err.message);
    } finally {
      setLoading(false);
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
