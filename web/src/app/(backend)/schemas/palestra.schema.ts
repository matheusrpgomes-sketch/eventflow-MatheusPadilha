import { z } from "zod"; 
 
export const criarPalestraSchema = z.object({ 
  titulo:    z.string().min(4, "Título no minímo 4 caracteres").max(120).trim(), 
  tema:      z.string().min(2, "Tema é obrigatório").trim(), 
  descricao: z.string().min(20, "Descrição da palestra em ao menos 20 caracteres").trim(), 
  duracao:   z.number().int().min(5, "Mínimo de 5 minutos").max(240, "Máximo de 240 minutos"), 
}); 
 
export type CriarPalestraInput = z.infer<typeof criarPalestraSchema>; 