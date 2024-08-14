import {NextRequest, NextResponse} from 'next/server';
import prisma from "@/utils/client";
import {verifyJwtToken} from "@/utils/authHelper";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";


export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest,{ params } : { params : {username: string } }) {

    const token = request.cookies.get('token');

    if (token === null || token === undefined) {
        return APIErrorResponse.return_error("token does not exist", StatusCodes.BAD_REQUEST);
    }
    const payload = await verifyJwtToken(token.value);

    if (payload === null || payload === undefined) {
        return APIErrorResponse.return_error("payload does not exist", StatusCodes.BAD_REQUEST);
    }


    if (await prisma.user.findFirst (
        {
            where: {
                username: params.username,
            }
        },
    ) !== null) {
        return APIErrorResponse.return_error("Username already exists", StatusCodes.BAD_REQUEST);
    }


    await prisma.user.update(
        {
            where: {
                userId: payload.userId as number,
            },
            data: {
                username: params.username,
            },
        }
    )


    return NextResponse.json("Username was updated successfully.");
}
