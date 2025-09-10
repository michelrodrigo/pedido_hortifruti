import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormPedido from './components/FormPedido';
import CadastroCliente from './components/CadastroCliente';
import Login from './components/Login';

function App() {
  const [cliente, setCliente] = useState(null);

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
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Faixa fixa para o brasão */}
        <div
          style={{
            backgroundColor: '#014038', // cor sólida fixa
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <img
            src="/brasao.png"
            alt="Logo"
            style={{
              height: '100px',
              width: 'auto',
            }}
          />
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white', // contraste com a faixa
              margin: 0,
            }}
          >
            Villaggio Della Frutta
          </h1>
        </div>

        {/* Conteúdo com gradiente iniciando logo abaixo */}
        <div
          style={{
            flex: 1,
            background: 'linear-gradient(to bottom, #014038, #f3e7d3)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <nav
            style={{
              padding: '10px',
              borderBottom: '1px solid #ccc',
              display: 'flex',
              gap: '20px',
              fontSize: '24px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🏠 Início</Link>
            <Link to="/cadastro" style={{ color: 'white', textDecoration: 'none' }} >📝 Cadastro</Link>
            {!cliente && <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>🔑 Login</Link>}
            {cliente && (
              <>
                <span style={{ color: 'white', textDecoration: 'none' }}>👤 {cliente.nome}</span>
                <button onClick={handleLogout} style={{ fontSize: '18px', color: 'white', textDecoration: 'none' }}>
                  🚪 Sair
                </button>
              </>
            )}
          </nav>

          <div style={{ padding: '20px', flex: 1 }}>
            <Routes>
              <Route path="/" element={<FormPedido cliente={cliente} />} />
              <Route path="/cadastro" element={<CadastroCliente />} />
              <Route path="/login" element={<Login onLoginSucesso={setCliente} />} />
            </Routes>
          </div>

          {/* Rodapé decorativo */}
          <div style={{ width: '100vw', overflow: 'hidden' }}>
            <img
              src="/base.png"
              alt="Rodapé decorativo"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
