// App.jsx
/*
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormPedido from './components/FormPedido';
import CadastroCliente from './components/CadastroCliente';
import Login from './components/Login';

function App() {
  const [cliente, setCliente] = useState(null);

  // Carrega cliente salvo no localStorage ao iniciar
  useEffect(() => {
    const salvo = localStorage.getItem('cliente');
    if (salvo) setCliente(JSON.parse(salvo));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cliente');
    setCliente(null);
  };

  return (
    <Router>
      <div>
        <h1 style={{ textAlign: 'center', padding: '20px' }}>🍎 Villagio Della Fruta</h1>

        //{ Menu de navegação }
        <nav style={{
          padding: '10px',
          borderBottom: '1px solid #ccc',
          display: 'flex',
          gap: '20px',
          fontSize: '24px',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <Link to="/">🏠 Início</Link>
          <Link to="/cadastro">📝 Cadastro</Link>
          {!cliente && <Link to="/login">🔑 Login</Link>}
          {cliente && (
            <>
              <span>👤 {cliente.nome}</span>
              <button onClick={handleLogout} style={{ fontSize: '18px' }}>🚪 Sair</button>
            </>
          )}
        </nav>

        //{ Rotas da aplicação}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<FormPedido cliente={cliente} />} />
            <Route path="/cadastro" element={<CadastroCliente />} />
            <Route path="/login" element={<Login onLoginSucesso={setCliente} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
*/

import React from 'react';
import TesteProdutos from './components/TesteProdutos';

export default function App() {
  return (
    <div>
      <TesteProdutos />
    </div>
  );
}
