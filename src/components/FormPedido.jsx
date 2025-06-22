// src/components/FormPedido.jsx
import React from 'react';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import Select, { components } from 'react-select';
import produtos from '../products';

export default function FormPedido() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { itens: [{ produto: '', unidade: 'unidade', quantidade: '' }] }
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'itens' });
  const itensWatch = useWatch({ control, name: 'itens', defaultValue: [] });

  // component for option in menu
  const Option = props => (
    <components.Option {...props}>
      <img src={props.data.img} alt="" style={{ width: 30, marginRight: 8, borderRadius: 4 }} />
      {props.data.label}
    </components.Option>
  );
  // component for selected value shown in input
  const SingleValue = props => (
    <components.SingleValue {...props}>
      <img src={props.data.img} alt="" style={{ width: 30, marginRight: 8, borderRadius: 4 }} />
      {props.data.label}
    </components.SingleValue>
  );

  const onSubmit = async data => {
	  try {
		  const resp = await fetch('https://script.google.com/macros/s/AKfycbzcdTYjCBs840_xJqrroalDoQ1SrxUXHEWOQyjEjEFzje5ehcvXn2_N6QulLnE3mJnFfQ/exec', {
			method: 'POST',
			redirect: 'follow',
			headers: { 'Content-Type': 'text/plain;charset=utf-8' },
			body: JSON.stringify({ itens: data.itens })
		  });
	
		  const json = await resp.json();
			if (json.success) {
			  alert('Pedido enviado com sucesso!');
			  // 👉 limpa o formulário aqui
			  reset({
				itens: [{ produto: '', unidade: 'unidade', quantidade: '' }]
			  });
			} else {
			  alert('Erro: ' + (json.error || 'desconhecido'));
			}
	  } catch (err) {
		alert('Falha no envio: ' + err.message);
	  }
	};
  


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, idx) => (
        <div key={field.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Controller
            control={control}
            name={`itens.${idx}.produto`}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={produtos}
                components={{ Option, SingleValue }}
                placeholder="Selecione produto"
              />
            )}
          />
          <select name={`itens.${idx}.unidade`} defaultValue="unidade" {...control.register(`itens.${idx}.unidade`)}>
            <option value="unidade">Unidade</option>
            <option value="quilo">Kilo</option>
          </select>
          <input
            type="number"
            step="any"
            defaultValue={itensWatch[idx]?.quantidade}
            placeholder="Quantidade"
            {...control.register(`itens.${idx}.quantidade`, { required: true })}
          />
          <button type="button" onClick={() => remove(idx)}>Remover</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ produto: '', unidade: 'unidade', quantidade: '' })}>
        + Adicionar item
      </button>
      <button type="submit">Finalizar pedido</button>
    </form>
  );
}
