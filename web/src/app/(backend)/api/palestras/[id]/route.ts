import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { buscarPalestraPorId } from "@/backend/services/palestras";
import { zodErrorHandler } from "@/utils/api/server";

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