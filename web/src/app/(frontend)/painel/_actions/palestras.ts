import type { CriarPalestraInput } from "@/app/(backend)/schemas/palestra.schema";

export async function criarPalestra(dados: CriarPalestraInput) {
  const res = await fetch("/api/palestras", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Erro ao criar palestra");
  return json;
}
export async function removerPalestra(id: string) {
  const res = await fetch(`/api/palestras/${id}`, { method: "DELETE" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Erro ao remover palestra");
  return json;
}