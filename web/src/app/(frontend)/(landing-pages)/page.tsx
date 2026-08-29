import LandingPagesNav from "@/components/base/nav/InitialNav";
import Embarcar from "./_components/Embarcar";
import { headers } from "next/headers";
import { auth } from "@/auth";
import CarouselExample from "./_components/CarouselExample";
import { listarPublicadas } from "@/app/(backend)/services/palestras";
export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  const isLogged = !!session?.user;
  const palestras = await listarPublicadas();
  return (
    <div className="min-h-screen">
      <LandingPagesNav isLogged={isLogged} />
      
     <main>
       <h1 className="items-center justify-center">Palestras</h1>
         {palestras.map((palestra) => (
        <div key={palestra.id}>
      <h2>{palestra.titulo}</h2>
        <p>{palestra.tema}</p>
    </div>
  ))}
    </main>

      <div className="w-full flex items-center justify-center">
        <Embarcar isLogged={isLogged} />
      </div>

      <p className="text-center pt-8">um carousel de exemplo :)</p>
      <CarouselExample />
    </div>
  );
}