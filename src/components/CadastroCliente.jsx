import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from "react";

function CadastroCliente() {
  console.log('Cadastro carregado');
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const onSubmit = async (dados) => {
	  setLoading(true);
	  setMensagem("");

	  try {
		// Inclui a ação "cadastrar" junto com os dados do formulário
		const bodyComAcao = {
		  ...dados,
		  acao: "cadastrar",
		};

		const resposta = await fetch("/.netlify/functions/cadastrar-cliente", {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(bodyComAcao),
		});

		const resultado = await resposta.json();

		if (resultado.success) {
		  setMensagem("✅ Cadastro realizado com sucesso!");
		  reset();
		} else {
		  setMensagem("❌ " + resultado.error);
		}
	  } catch (err) {
		setMensagem("❌ Erro ao se comunicar com o servidor.");
	  }

	  setLoading(false);
	};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Cadastro de Cliente</h2>

      <input placeholder="Nome" {...register("nome")} required />
      <input type="email" placeholder="Email" {...register("email")} required />
      <input type="password" placeholder="Senha" {...register("senha")} required />
      <input placeholder="Telefone" {...register("telefone")} required />
      <input placeholder="Endereço de entrega" {...register("endereco")} required />

      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Cadastrar"}
      </button>

      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}

export default CadastroCliente;
