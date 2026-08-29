import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request : NextRequest, 
{params} : { params: Promise<{ id: string }> }
) {
const {id} = await params;
}