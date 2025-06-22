import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import FormPedido from './components/FormPedido';

function App() {
  return (
    <div>
      <h1>Meu Pedido</h1>
      <FormPedido />
    </div>
  );
}

export default App;
