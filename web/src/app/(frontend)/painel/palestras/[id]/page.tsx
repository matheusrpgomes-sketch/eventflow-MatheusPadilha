import { buscarPalestraPorId } from "@/app/(backend)/services/palestras";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import FormularioEdicao from "../../_components/FormularioEdicao";

export default async function EditarPalestra({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const palestra = await buscarPalestraPorId(id);
  if (!palestra || palestra.removidoEm) {
    return <p>Palestra não encontrada</p>;
  }
  if (palestra.autorId !== session.user.id) {
    return <p>Você só pode editar as suas palestras</p>;
  }

  return <FormularioEdicao palestra={palestra} />;
}