 import { listaPalestraPalestrante } from "@/app/(backend)/services/palestras";
 import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BotaoRemover from "./_components/botaoremove";
export default async function Painel() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const palestras = await listaPalestraPalestrante(session.user.id);

  return (
    <div>
      <h1>Minhas palestras</h1>
      {palestras.map((palestra) => (
        <div key={palestra.id}>
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