import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { buscarPalestraPorId, atualizarPalestra } from "@/backend/services/palestras";
import { zodErrorHandler, getUserFromRequest, validBody, returnInvalidDataErrors } from "@/utils/api/server";
import { atualizarPalestraSchema } from "@/app/(backend)/schemas/palestra.schema";
export async function GET(request : NextRequest, 
{params} : { params: Promise<{ id: string }> }
) {
try {
  const { id } = await params;
  const palestra = await buscarPalestraPorId(id);
  
  if (!palestra || palestra.removidoEm) {
    return NextResponse.json({ error: "Palestra nao encontrada" }, { status: 404 });
  }
  
  return NextResponse.json(palestra);        
} catch (error) {
  return zodErrorHandler(error);            
}}
export async function PATCH(request : NextRequest, 
{params} : { params: Promise<{ id: string }> }
) {
try {
  const { id } = await params;
  const user = await getUserFromRequest(request);
  if (user instanceof NextResponse) return user;
  const palestra = await buscarPalestraPorId(id);
    if (!palestra || palestra.removidoEm) {
    return NextResponse.json({ error: "Palestra nao encontrada" }, { status: 404 });
  }
  if (palestra.autorId !== user.id) {
  return NextResponse.json({ error: "Você só pode editar as suas palestras" }, { status: 403 });
}
  const corpo = await validBody(request);
const validacao = atualizarPalestraSchema.safeParse(corpo);
if (!validacao.success) {
  return returnInvalidDataErrors(validacao.error);
}

const atualizada = await atualizarPalestra(id, validacao.data);
return NextResponse.json(atualizada);

} catch (error) {
  if (error instanceof NextResponse) return error;
  return zodErrorHandler(error);
}}