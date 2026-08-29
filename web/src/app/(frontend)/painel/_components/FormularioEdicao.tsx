"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { atualizarPalestra } from "../_actions/palestras";
import type { Palestra } from "@/generated/prisma";

export default function FormularioEdicao({ palestra }: { palestra: Palestra }) {
      const [titulo, setTitulo] = useState(palestra.titulo);
  const [tema, setTema] = useState(palestra.tema);
  const [descricao, setDescricao] = useState(palestra.descricao);
  const [duracao, setDuracao] = useState(String(palestra.duracao));
  const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await atualizarPalestra(palestra.id, {
        titulo,
        tema,
        descricao,
        duracao: Number(duracao),
      });
      router.push("/painel");
    } catch (error: unknown) {
      const mensagem = error instanceof Error ? error.message : "Erro ao editar palestra";
      toast.error(mensagem);
    }
  }
    return (
    <form onSubmit={handleSubmit}>
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" />
      <input value={tema} onChange={(e) => setTema(e.target.value)} placeholder="Tema" />
      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <input value={duracao} onChange={(e) => setDuracao(e.target.value)} placeholder="Duração em minutos" type="number" />
      <button type="submit">Salvar alterações</button>
    </form>
  );
}