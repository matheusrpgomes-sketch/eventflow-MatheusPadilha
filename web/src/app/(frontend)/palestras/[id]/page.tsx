import { buscarPalestraPorId } from "@/app/(backend)/services/palestras";
export default async function DetalhePalestra({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const palestra = await buscarPalestraPorId(id);
  if (!palestra || palestra.removidoEm) {
    return <p>Palestra não encontrada</p>;
  }
  return (
    <div>
      <h1>{palestra.titulo}</h1>
      <p>{palestra.tema}</p>
      <p>{palestra.duracao} minutos</p>
      <p>{palestra.autorNome}</p>
      <p>{palestra.descricao}</p>
    </div>
  );
}