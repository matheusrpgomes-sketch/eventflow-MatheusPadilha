import LandingPagesNav from "@/components/base/nav/InitialNav";
import Embarcar from "./_components/Embarcar";
import { headers } from "next/headers";
import { auth } from "@/auth";
import CarouselExample from "./_components/CarouselExample";
import { listarPublicadas } from "@/app/(backend)/services/palestras";
import type { Palestra } from "@/generated/prisma";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });


  const isLogged = !!session?.user;
  const palestras = await listarPublicadas();
  const total = palestras.length
    function calcularMedia(lista: Palestra[]) {
      if (lista.length > 0) {
      return lista.reduce((soma, p) => soma + p.duracao, 0) / lista.length;
  }
    return 0;
}
  const media = calcularMedia(palestras);
  return (
    <div className="min-h-screen">
      <LandingPagesNav isLogged={isLogged} />
      
     <main>
  <h1 className="w-full flex items-center justify-center">Palestras</h1>
  <p className="w-full flex items-center justify-center">Total de palestras: {total}</p>
  <p className="w-full flex items-center justify-center">Duração média: {media} minutos</p>

  {palestras.map((palestra) => (
    <div key={palestra.id} className="flex flex-col items-center gap-2 border rounded-lg p-4 my-4">
  <h2 className="text-xl font-semibold">{palestra.titulo}</h2>
  <p>{palestra.tema}</p>
  <p>{palestra.duracao} minutos</p>
  <p>{palestra.autorNome}</p>
  <p>{palestra.descricao}</p>
</div>
  ))}
</main>

      <div className="w-full flex items-center justify-center">
        
      </div>

      
    </div>
  );
}