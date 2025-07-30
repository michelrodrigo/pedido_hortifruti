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
      {/* Aplicar o gradiente de fundo neste container */}
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #254d42, #f3e7d3)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1
		  style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: '16px',
			padding: '20px',
			fontSize: '32px',
			fontWeight: 'bold',
		  }}
		>
		  <img
			src="/brasao.png" // ou o caminho correto para o arquivo
			alt="Logo"
			style={{
			  height: '100px', // ajusta conforme necessário
			  width: 'auto',
			}}
		  />
		  Villaggio Della Frutta
		</h1>


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

        <div style={{ padding: '20px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<FormPedido cliente={cliente} />} />
            <Route path="/cadastro" element={<CadastroCliente />} />
            <Route path="/login" element={<Login onLoginSucesso={setCliente} />} />
          </Routes>
        </div>

        {/* Rodapé decorativo com imagem */}
        <div style={{ width: '100vw', overflow: 'hidden' }}>
          <img
            src="/base.png"
            alt="Rodapé decorativo"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
