import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import FormPedido from './components/FormPedido';

function App() {
  return (
    <div>
      <h1 style={{padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>Meu Pedido</h1>
      <FormPedido />
    </div>
  );
}

export default App;
