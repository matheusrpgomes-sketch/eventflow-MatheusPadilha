import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { criarPalestra, listarPublicadas } from "../../services/palestras";
import { NumeroDePalestra } from "../../services/palestras";
import { getUserFromRequest, returnInvalidDataErrors, validBody, zodErrorHandler } from "@/utils/api/server";
import { criarPalestraSchema } from "../../schemas/palestra.schema";

export async function GET(request: NextRequest) {
   try {
        const palestras = await listarPublicadas();
        return NextResponse.json(palestras);
    }catch (error) {
        return zodErrorHandler(error);

    }
}
export async function POST(request: NextRequest){
    try {
        const user = await getUserFromRequest(request);
        if (user instanceof NextResponse) return user;
        const corpo = await validBody(request)
        const validarresultado = criarPalestraSchema.safeParse(corpo));
        if(!validarresultado.success) {
            return returnInvalidDataErrors(validarresultado.error)
        }
        const ativas =  await NumeroDePalestra(user.id)
        if (ativas >= 3)
              return NextResponse.json( 
        { error: `Limite de 3 palestras ativas atingido` }, 
        { status: 409 } 
        const adicionar = await criarPalestra({ 
      ...validarresultado.data, 
      autorId: user.id, 
      autorNome: user.name, 
        }); 
    }
       return NextResponse.json(adicionar, { status: 201 }); 
  } catch (error) { 
    if (error instanceof NextResponse) return error; 
    return zodErrorHandler(error); 
  }

}