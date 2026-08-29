"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { removerPalestra } from "../_actions/palestras";

export default function BotaoRemover({ id }: { id: string }) {
  const router = useRouter();

  async function handleRemover() {
    try {
      await removerPalestra(id);
      router.refresh();
    } catch (error: unknown) {
      const mensagem = error instanceof Error ? error.message : "Erro ao remover";
      toast.error(mensagem);
    }
  }

  return <button onClick={handleRemover}>Remover</button>;
}