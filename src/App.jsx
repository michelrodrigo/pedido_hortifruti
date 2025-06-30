// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormPedido from './components/FormPedido';
import CadastroCliente from './components/CadastroCliente';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div >
		<h1 style={{ textAlign: 'center', padding: '20px' }}>🍎 Villagio Della Fruta</h1>
        {/* Menu de navegação */}
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', gap: '20px', fontSize: '30px', display: 'flex', justifyContent: 'center'}}>
          <Link to="/">🏠 Início</Link>
          <Link to="/cadastro">📝 Cadastro</Link>
          <Link to="/login">🔑 Login</Link>
        </nav>

        {/* Rotas da aplicação */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<FormPedido />} />
            <Route path="/cadastro" element={<CadastroCliente />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
