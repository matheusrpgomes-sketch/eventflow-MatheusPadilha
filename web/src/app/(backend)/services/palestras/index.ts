import prisma from "@/backend/services/db";
type AtualizarPalestraData = {
  titulo?: string;
  tema?: string;
  descricao?: string;
  duracao?: number;
};

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
export async function buscarPalestraPorId(id: string) {
  return await prisma.palestra.findUnique({ where: { id } });
}
export async function atualizarPalestra(id: string, dados: AtualizarPalestraData) {
    return await prisma.palestra.update({where: {id},  data: dados });

}

export async function removerPalestra(id: string) {
    return await prisma.palestra.update({where: {id},  data:{removidoEm : new Date()} });

}
