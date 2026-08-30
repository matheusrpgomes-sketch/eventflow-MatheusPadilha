export async function atualizarPerfil(id: string, dados: { name?: string; bio?: string }) {
  const res = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Erro ao atualizar perfil");
  return json;
}

export async function removerPerfil(id: string) {
  const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Erro ao remover perfil");
  return json;
}