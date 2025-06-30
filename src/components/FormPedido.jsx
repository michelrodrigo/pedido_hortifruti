// src/components/FormPedido.jsx
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import Select, { components } from 'react-select';
import produtos from '../products';
import { FaTrashAlt, FaSpinner } from 'react-icons/fa'; // FontAwesome


export default function FormPedido() {
  const { control, register, handleSubmit, reset, setValue, formState: {errors} } = useForm({
    nome: '',
	defaultValues: { itens: [{ produto: '', unidade: 'unidade', quantidade: '' }] }
  });
  useEffect(() => {
	  const atualizarDadosCliente = () => {
		const clienteSalvo = localStorage.getItem("cliente");
		if (clienteSalvo) {
		  const dados = JSON.parse(clienteSalvo);
		  setValue("nome", dados.nome || "");
		  setValue("telefone", dados.telefone || "");
		  setValue("endereco", dados.endereco || "");
		} else {
		  // Limpa os campos se não há cliente
		  reset({
			nome: '',
			telefone: '',
			endereco: '',
			dataEntrega: '',
			itens: [{ produto: '', unidade: 'unidade', quantidade: '' }]
		  });
		}
	  };

	  atualizarDadosCliente();

	  // Verifica mudanças no localStorage a cada 1 segundo
	  const intervalo = setInterval(atualizarDadosCliente, 1000);

	  return () => clearInterval(intervalo);
	}, [setValue, reset]);
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
		  acao: 'pedido',
		  nome: data.nome,
		  telefone: data.telefone,
		  dataEntrega: data.dataEntrega,
		  endereco: data.endereco,
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
		  const numero = String(data.telefone).replace(/\D/g, '');
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

  return `Olá! Meu nome é ${nome}.
	Gostaria de fazer o seguinte pedido para o dia ${data.dataEntrega}:

	${itens}

	Endereço de entrega:
	${data.endereco}`;
};
  
	const unidades = [
	  { value: 'unidade', label: 'Un' },
	  { value: 'quilo', label: 'Kg' }
	];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
	<div style={{ marginBottom: 16 }}>
	<label>Nome:</label>
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
	  <label>Telefone:</label>
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
		<div style={{ marginBottom: 16 }}>
	  <label>Data de entrega:</label>
	  <input
		type="date"
		{...register('dataEntrega', { required: 'Informe a data de entrega.' })}
		style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
	  />
	  {errors.dataEntrega && <p style={{ color: 'red' }}>{errors.dataEntrega.message}</p>}
	</div>

	<div style={{ marginBottom: 16 }}>
	  <label>Endereço:</label>
	  <textarea
		{...register('endereco', { required: 'Informe o endereço de entrega.' })}
		placeholder="Endereço de entrega: Rua, número, bairro..."
		style={{ padding: '8px', width: '100%', boxSizing: 'border-box', fontSize: '30px' }}
	  />
	  {errors.endereco && <p style={{ color: 'red' }}>{errors.endereco.message}</p>}
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
				style={{ padding: '10px 10px' }}
			  >
				–
			  </button>

			  <input
				type="number"
				step="any"
				value={itensWatch[idx]?.quantidade || ''}
				placeholder="Quantidade"
				style={{ width: 150, height: 50, textAlign: 'center', fontSize: '20px' }}
				{...register(`itens.${idx}.quantidade`, { required: true })}
			  />

			  <button
				type="button"
				onClick={() => {
				  const atual = parseFloat(itensWatch[idx]?.quantidade || 0);
				  const novo = atual + 1;
				  setValue(`itens.${idx}.quantidade`, novo);
				}}
				style={{ padding: '10px 10px' }}
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
			fontSize: '40px'
		  }}
		  disabled={loading}
		>
		  {loading && (
			<span className="spinner" />
		  )}
		  {loading ? 'Enviando...' : 'Finalizar pedido'}
		</button>
    </form>
  );
}
