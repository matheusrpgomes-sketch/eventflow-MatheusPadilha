import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { listarPublicadas } from "../../services/palestras";
import { NumeroDePalestra } from "../../services/palestras";
import { zodErrorHandler } from "@/utils/api/server";

export async function GET(request: NextRequest) {
   try {
        const palestras = await listarPublicadas();
        return NextResponse.json(palestras);
    }catch (error) {
        return zodErrorHandler(error);

    }
}
export async function POST(request: NextRequest){

}