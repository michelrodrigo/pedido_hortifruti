// src/components/FormPedido.jsx
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import Select, { components } from 'react-select';
import produtos from '../products';
import { FaTrashAlt, FaSpinner, FaStickyNote, FaPen } from 'react-icons/fa'; // FontAwesome


export default function FormPedido() {
  const { control, register, handleSubmit, reset, setValue, formState: {errors} } = useForm({
    nome: '',
	defaultValues: { itens: [{ produto: '', unidade: 'unidade', quantidade: '' }] }
  });
  useEffect(() => {
  const listener = () => {
    const clienteSalvo = localStorage.getItem("cliente");
    if (clienteSalvo) {
      const dados = JSON.parse(clienteSalvo);
      setValue("nome", dados.nome || "");
      setValue("telefone", dados.telefone || "");
      setValue("endereco", dados.endereco || "");
    }
  };

  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}, [setValue]);
	
	
  const { fields, append, remove } = useFieldArray({ control, name: 'itens' });
  const itensWatch = useWatch({ control, name: 'itens', defaultValue: [] });
  
  const [loading, setLoading] = useState(false);
  const [observacoesAtivas, setObservacoesAtivas] = useState([]);


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
	
      {fields.map((field, idx) => {
		const produtoSelecionado = itensWatch[idx]?.produto;
		const unidadesDisponiveis = produtoSelecionado?.unidades || ['UN', 'KG'];


		  return (
			<div key={field.id}>
				<div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>

				  {/* Produto */}
				  <Controller
					control={control}
					name={`itens.${idx}.produto`}
					rules={{ required: 'Selecione um produto.' }}
					render={({ field, fieldState }) => (
					  <div style={{ flex: 3 }}>
						<Select
						  {...field}
						  value={field.value || null}
						  options={produtos}
						  components={{ Option, SingleValue }}
						  menuPortalTarget={document.body}
						  placeholder="Selecione produto"
						  onChange={(selected) => {
							field.onChange(selected);
							if (selected?.unidades?.length) {
							  setValue(`itens.${idx}.unidade`, selected.unidades[0]);
							}
							// Define 'nenhuma' (string vazia) como valor inicial para cada categoria de observações
						    if (selected?.observacoes) {
							  selected.observacoes.forEach(obsCat => {
							    setValue(`itens.${idx}.observacoes.${obsCat.categoria}`, '');
							  });
						    }
						  }}
						  styles={{
							control: (base) => ({ ...base, fontSize: '30px' }),
							option: (base) => ({ ...base, fontSize: '30px' }),
							singleValue: (base) => ({ ...base, fontSize: '30px' }),
						  }}
						/>
						{fieldState?.error && (
						  <p style={{ color: 'red', fontSize: '16px' }}>{fieldState.error.message}</p>
						)}
					  </div>
				)}
			  />
			{/* Botão para adicionar observações, se houver */}
				<div style={{ marginTop: 8 }}>
				  <button
					  type="button"
					  onClick={() =>
						setObservacoesAtivas((prev) =>
						  prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
						)
					  }
					  disabled={
						!produtoSelecionado?.observacoes ||
						produtoSelecionado.observacoes.length === 0
					  }
					  title="Adicionar observações"
					  style={{
						background: 'none',
						border: 'none',
						cursor:
						  !produtoSelecionado?.observacoes ||
						  produtoSelecionado.observacoes.length === 0
							? 'not-allowed'
							: 'pointer',
						fontSize: '30px',
						color: observacoesAtivas.includes(idx) ? '#007bff' : '#999',
						marginLeft: 4,
					  }}
					>
					  <FaPen />
					</button>
				</div>
				
				
			  {/* Unidade (dinâmica) */}
			  <Controller
				control={control}
				name={`itens.${idx}.unidade`}
				render={({ field }) => (
				  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
					{unidadesDisponiveis.map((opt) => (
					  <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '30px', cursor: 'pointer' }}>
						<input
						  type="radio"
						  value={opt}
						  checked={field.value === opt}
						  onChange={() => field.onChange(opt)}
						/>
						{opt.toUpperCase()}
					  </label>
					))}
				  </div>
				)}
			  />

			  {/* Quantidade */}
			  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
					{...register(`itens.${idx}.quantidade`, { required: 'Informe a quantidade.' })}
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

				{errors?.itens?.[idx]?.quantidade && (
				  <p style={{ color: 'red', fontSize: '16px', marginTop: 4 }}>
					{errors.itens[idx].quantidade.message}
				  </p>
				)}
			  </div>

			  {/* Botão remover */}
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
			
			{observacoesAtivas.includes(idx) &&
				  produtoSelecionado?.observacoes?.map((obsCat, catIndex) => (
					<div key={catIndex} style={{ marginTop: 8 }}>
					  <strong style={{ fontSize: '18px' }}>{obsCat.categoria.toUpperCase()}:</strong>
					  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 4 }}>
						{obsCat.opcoes.map((opcao, opcaoIndex) => (
						  <label key={opcaoIndex} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
							<Controller
							  control={control}
							  name={`itens.${idx}.observacoes.${obsCat.categoria}`}
							  render={({ field }) => (
								<input
								  type="radio"
								  value={opcao}
								  default="Nenhuma"
								  checked={field.value === opcao}
								  onChange={() => field.onChange(opcao)}
								/>
							  )}
							/>
							{opcao}
						  </label>
						))}

						{/* Opção de "nenhuma observação" */}
						<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						  <Controller
							control={control}
							name={`itens.${idx}.observacoes.${obsCat.categoria}`}
							render={({ field }) => (
							  <input
								type="radio"
								value=""
								checked={field.value === ''}
								onChange={() => field.onChange('')}
							  />
							)}
						  />
						  Nenhuma
						</label>
					  </div>
					</div>
				  ))}
			</div>
		  );
		})}

      <button type="button" onClick={() => append({ produto: null, unidade: 'unidade', quantidade: '' })}>
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