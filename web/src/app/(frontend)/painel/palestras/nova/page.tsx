"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { criarPalestra } from "../../_actions/palestras";

export default function NovaPalestra() {
      const [titulo, setTitulo] = useState("");
  const [tema, setTema] = useState("");
  const [descricao, setDescricao] = useState("");
  const [duracao, setDuracao] = useState("");
  const router = useRouter();
    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await criarPalestra({
        titulo,
        tema,
        descricao,
        duracao: Number(duracao),
      });
      router.push("/painel");
    } catch (error: unknown) {
      const mensagem = error instanceof Error ? error.message : "Erro ao criar palestra";
      toast.error(mensagem);
    }
  }
    return (
    <form onSubmit={handleSubmit}>
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" />
      <input value={tema} onChange={(e) => setTema(e.target.value)} placeholder="Tema" />
      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <input value={duracao} onChange={(e) => setDuracao(e.target.value)} placeholder="Duração em minutos" type="number" />
      <button type="submit">Salvar</button>
    </form>
  );
}