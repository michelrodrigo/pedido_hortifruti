// src/components/FormPedido.jsx
import React, { useState } from 'react';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import Select, { components } from 'react-select';
import produtos from '../products';
import { FaTrashAlt, FaSpinner } from 'react-icons/fa'; // FontAwesome

export default function FormPedido() {
  const { control, register, handleSubmit, reset, setValue, formState: {errors} } = useForm({
    nome: '',
	defaultValues: { itens: [{ produto: '', unidade: 'unidade', quantidade: '' }] }
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'itens' });
  const itensWatch = useWatch({ control, name: 'itens', defaultValue: [] });
  
  const [loading, setLoading] = useState(false);

  // component for option in menu
  const Option = props => (
    <components.Option {...props} >
	  <div style={{ display: 'flex', alignItems: 'center' }}>
		<img src={props.data.img} alt="" style={{ width: 30, marginRight: 8, borderRadius: 4 }} />
		<span>{props.data.label}</span>
	   </div>
    </components.Option>
  );
  // component for selected value shown in input
  const SingleValue = props => (
    <components.SingleValue {...props}>
		<div style={{ display: 'flex', alignItems: 'center' }}>
		  <img src={props.data.img} alt="" style={{ width: 80, marginRight: 8, borderRadius: 4 }} />
		  <span>{props.data.label}</span>
		</div>
    </components.SingleValue>
  );

  const onSubmit = async data => {
	  setLoading(true);
	  try {
		const pedidoFormatado = {
		  nome: data.nome,
		  telefone: data.telefone,
		  pedido: data.itens.map(item => ({
			  produto: item.produto?.label || 'Produto não selecionado',
			  quantidade: Number(item.quantidade) || 0,
			  unidade: item.unidade
			}))
		};

		console.log("JSON ENVIADO:", pedidoFormatado); // 🔍 Veja no console do navegador
	 
		
		const resp = await fetch('/enviar-pedido', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify(pedidoFormatado)
		});

		const text = await resp.text();
		console.log('Resposta recebida (text):', text);

		let json;
		try {
		  json = JSON.parse(text);
		} catch (e) {
		  throw new Error('Resposta do servidor não é JSON válido.');
		}

		if (json.success) {
		  alert('Pedido enviado com sucesso!');
		  reset({
			nome: '',
			telefone: '',
			itens: [{ produto: '', unidade: 'unidade', quantidade: '' }]
		  });

		  // WhatsApp
		  const msg = gerarResumoPedido(data);
		  const numero = data.telefone.replace(/\D/g, '');
		  const url = `https://wa.me/55${numero}?text=${encodeURIComponent(msg)}`;
		  window.open(url, '_blank');
		} else {
		  alert('Erro: ' + (json.error || 'desconhecido'));
		}
	  }
	  catch (err) {
		alert('Falha no envio: ' + err.message);
	  } finally {
		setLoading(false);
	  }
	};
	
	

	
	const gerarResumoPedido = (data) => {
	  const nome = data.nome;
	  const telefone = data.telefone;
	  const itens = data.itens.map(item => {
		const nomeProduto = item.produto?.label || 'Produto não selecionado';
		return `• ${nomeProduto} (${item.quantidade} ${item.unidade})`;
	  }).join('\n');

  return `Olá! Meu nome é ${nome}.\nGostaria de fazer o seguinte pedido:\n${itens}`;
};
  
	const unidades = [
	  { value: 'unidade', label: 'Un' },
	  { value: 'quilo', label: 'Kg' }
	];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
	<div style={{ marginBottom: 16 }}>
		<input
		  {...register('nome', { required: 'Por favor, informe seu nome.' })}
		  placeholder="Seu nome"
		  style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
		/>
		{errors.nome && (
		  <p style={{ color: 'red', marginTop: 4 }}>
			{errors.nome.message}
		  </p>
		)}
	</div>
	<div style={{ marginBottom: 16 }}>
	  <input
		{...register('telefone', {
		  required: 'Por favor, informe seu telefone.',
		  pattern: {
			value: /^\d{10,11}$/,
			message: 'Informe um número com DDD (somente dígitos)'
		  }
		})}
		placeholder="Seu telefone (ex: 31999998888)"
		style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
	  />
	  {errors.telefone && (
		<p style={{ color: 'red', marginTop: 4 }}>{errors.telefone.message}</p>
	  )}
	</div>
      {fields.map((field, idx) => (
        <div key={field.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Controller
            control={control}
            name={`itens.${idx}.produto`}
            rules={{ required: true }}
            render={({ field }) => (
			<div style={{flex: 3}}>
              <Select
                {...field}
                options={produtos}
                components={{ Option, SingleValue }}
                placeholder="Selecione produto"
				styles={{
					control: (base) => ({
					  ...base,
					  fontSize: '30px', // tamanho da fonte da caixa principal
					}),
					option: (base) => ({
					  ...base,
					  fontSize: '30px', // tamanho da fonte das opções do menu dropdown
					}),
					singleValue: (base) => ({
					  ...base,
					  fontSize: '30px', // valor selecionado exibido
					}),
				  }}
              />
			  </div>
            )}
          />
          <Controller
			  control={control}
			  name={`itens.${idx}.unidade`}
			  defaultValue="unidade"
			  render={({ field }) => (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
				  {unidades.map((opt) => (
					<label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '30px', cursor: 'pointer' }}>
					  <input
						type="radio"
						value={opt.value}
						checked={field.value === opt.value}
						onChange={() => field.onChange(opt.value)}
					  />
					  {opt.label}
					</label>
				  ))}
				</div>
			  )}
			/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
			  <button
				type="button"
				onClick={() => {
				  const atual = parseFloat(itensWatch[idx]?.quantidade || 0);
				  const novo = Math.max(atual - 1, 0);
				  setValue(`itens.${idx}.quantidade`, novo);
				}}
				style={{ padding: '4px 8px' }}
			  >
				–
			  </button>

			  <input
				type="number"
				step="any"
				value={itensWatch[idx]?.quantidade || ''}
				placeholder="Quantidade"
				style={{ width: 80, textAlign: 'center', fontSize: '40px' }}
				{...register(`itens.${idx}.quantidade`, { required: true })}
			  />

			  <button
				type="button"
				onClick={() => {
				  const atual = parseFloat(itensWatch[idx]?.quantidade || 0);
				  const novo = atual + 1;
				  setValue(`itens.${idx}.quantidade`, novo);
				}}
				style={{ padding: '4px 8px' }}
			  >
				+
			  </button>
			</div>
          <button
			  type="button"
			  onClick={() => remove(idx)}
			  style={{
				background: 'none',
				border: 'none',
				cursor: 'pointer',
				fontSize: '40px',
				color: 'red',
			  }}
			  title="Remover item"
			>
			  <FaTrashAlt />
			</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ produto: '', unidade: 'unidade', quantidade: '' })}>
        + Adicionar item
      </button>
	  
      <button
		  type="submit"
		  style={{
			marginTop: '30px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: '8px',
			opacity: loading ? 0.7 : 1,
			pointerEvents: loading ? 'none' : 'auto',
			padding: '10px',
			fontSize: '30px'
		  }}
		  disabled={loading}
		>
		  {loading && (
			<FaSpinner
			  className="spinner"
			  style={{
				animation: 'spin 1s linear infinite',
				fontSize: '30px'
			  }}
			/>
		  )}
		  {loading ? 'Enviando...' : 'Finalizar pedido'}
		</button>
    </form>
  );
}
