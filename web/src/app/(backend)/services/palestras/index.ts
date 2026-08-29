import prisma from "@/backend/services/db";


export async function listarPublicadas() {
 const palestra = await prisma.palestra.findMany({
    where: {status: "PUBLICADA", removidoEm: null},
    orderBy: {criadoEm: "desc"}
    
 })
 return palestra
}

export async function NumeroDePalestra(autorId : string) {
    const numero = await prisma.palestra.count({
        where: {
            autorId,
            removidoEm: null,
            status: { in: ["RASCUNHO", "PUBLICADA"] },
        },
    });

    return numero;
}
type CriarPalestraData = {
  titulo: string;
  tema: string;
  descricao: string;
  duracao: number;
  autorId: string;
  autorNome: string;
};

export async function criarPalestra(dados: CriarPalestraData) {
  return await prisma.palestra.create({ data: dados });
}