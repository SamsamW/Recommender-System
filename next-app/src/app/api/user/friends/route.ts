import prisma from "@/utils/client";
import {z} from "zod";
import {NextRequest, NextResponse} from "next/server";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";
import {verifyJwtToken} from "@/utils/authHelper";


export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {

    const token = request.cookies.get('token');

    if (token === null || token === undefined) {
        return APIErrorResponse.return_error("token does not exist", StatusCodes.BAD_REQUEST);
    }
    const payload = await verifyJwtToken(token.value);

    if (payload === null || payload === undefined) {
        return APIErrorResponse.return_error("payload does not exist", StatusCodes.BAD_REQUEST);
    }

    const friends = await prisma.isFriendOf.findMany(
        {
            where: {
                userId: payload.userId as number
            },
            include: {
                friendOfUser: true
            }
        }
    )

    if(friends === null){
        return APIErrorResponse.return_error("No friends found", StatusCodes.BAD_REQUEST);
    }
    else{

        return NextResponse.json(friends);
    }
}

