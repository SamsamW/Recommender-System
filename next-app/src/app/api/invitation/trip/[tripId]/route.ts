import prisma from "@/utils/client";
import {z} from "zod";
import {NextRequest, NextResponse} from "next/server";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";
import {verifyJwtToken} from "@/utils/authHelper";

const Trip = z.object({
    tripId: z.number().or(z.string()).transform(Number)
})

type Trip = z.infer<typeof Trip>;

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest,{ params } : { params : {tripId: string } }) {

    const token = request.cookies.get('token');

    if (token === null || token === undefined) {
        return APIErrorResponse.return_error("token does not exist", StatusCodes.BAD_REQUEST);
    }
    const payload = await verifyJwtToken(token.value);

    if (payload === null || payload === undefined) {
        return APIErrorResponse.return_error("payload does not exist", StatusCodes.BAD_REQUEST);
    }

    const trip_to_load: Trip = Trip.parse(params);

    const invitation = await prisma.tripInvitation.findFirst(
        {
            where: {
                AND: [
                    {tripId: trip_to_load.tripId},
                    {userRecieveId: payload.userId as number},
                ]
            },
            include: {
                userSend: true,
            },
        }
    )


    if(invitation === null){
        return APIErrorResponse.return_error("No invitations found", StatusCodes.BAD_REQUEST);
    }
    else{
        return NextResponse.json(invitation);
    }
}

