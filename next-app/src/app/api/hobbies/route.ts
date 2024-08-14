import prisma from "@/utils/client";
import {NextRequest, NextResponse} from "next/server";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";


export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {


    const hobbies = await prisma.hobby.findMany({})

    if(hobbies === null){
        return APIErrorResponse.return_error("No interests found", StatusCodes.BAD_REQUEST);
    }
    else{
        return NextResponse.json(hobbies);
    }
}

