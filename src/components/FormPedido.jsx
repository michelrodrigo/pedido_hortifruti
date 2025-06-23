// src/components/FormPedido.jsx
import React from 'react';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import Select, { components } from 'react-select';
import produtos from '../products';
import { FaTrashAlt } from 'react-icons/fa'; // FontAwesome

export default function FormPedido() {
  const { control, register, handleSubmit, reset, setValue, formState: {errors} } = useForm({
    nome: '',
	defaultValues: { itens: [{ produto: '', unidade: 'unidade', quantidade: '' }] }
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'itens' });
  const itensWatch = useWatch({ control, name: 'itens', defaultValue: [] });

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

		
		const resp = await fetch('http://localhost:3000/enviar-pedido', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify(pedidoFormatado)
		});

		const json = await resp.json();

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
	  } catch (err) {
		alert('Falha no envio: ' + err.message);
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
	  
      <button type="submit" style={{ marginTop: '30px' }}>Finalizar pedido</button>
    </form>
  );
}
