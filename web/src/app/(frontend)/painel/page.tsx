 import { listaPalestraPalestrante } from "@/app/(backend)/services/palestras";
 import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BotaoRemover from "./_components/botaoremove";
import Link from "next/link";
export default async function Painel() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const palestras = await listaPalestraPalestrante(session.user.id);

  return (
    <div>
      <h1>Minhas palestras</h1>
      <Link href="/painel/palestras/nova">Nova palestra</Link>
      {palestras.map((palestra) => (
        <div key={palestra.id}>
          <Link href={`/painel/palestras/${palestra.id}`}>Editar</Link>
          <h2>{palestra.titulo}</h2>
          <p>{palestra.tema}</p>
          <p>{palestra.duracao} minutos</p>
          <p>{palestra.status}</p>
          <BotaoRemover id={palestra.id} />
        </div>
      ))}
    </div>
  );
}