import {NextRequest, NextResponse} from 'next/server';
import prisma from "@/utils/client";
import {verifyJwtToken} from "@/utils/authHelper";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";
import {z} from "zod";

const Invitation = z.object({
    invitationId: z.number().or(z.string()).transform(Number),
    tripId: z.number().or(z.string()).transform(Number)
})

type Invitation = z.infer<typeof Invitation>;

export const dynamic = 'force-dynamic'

export async function PUT(request: NextRequest,{ params } : { params : {invitationId: string, tripId: string } }) {

    const token = request.cookies.get('token');

    if (token === null || token === undefined) {
        return APIErrorResponse.return_error("token does not exist", StatusCodes.BAD_REQUEST);
    }
    const payload = await verifyJwtToken(token.value);

    if (payload === null || payload === undefined) {
        return APIErrorResponse.return_error("payload does not exist", StatusCodes.BAD_REQUEST);
    }

    const invitation_to_load: Invitation = Invitation.parse(params);

    await prisma.tripInvitation.update(
        {
            where: {
                invitationId: invitation_to_load.invitationId ,
            },
            data: {
                status: "ACCEPTED",
            },
        }
    )

    await prisma.userOnTrip.create({
        data: {
            userId: payload.userId as number,
            tripId: invitation_to_load.tripId,
            personalState: false
        }
    })


    return NextResponse.json("Invitation was updated successfully.");
}

export async function DELETE(request: NextRequest,{ params } : { params : {invitationId: string, tripId: string } }) {

    const token = request.cookies.get('token');

    if (token === null || token === undefined) {
        return APIErrorResponse.return_error("token does not exist", StatusCodes.BAD_REQUEST);
    }
    const payload = await verifyJwtToken(token.value);

    if (payload === null || payload === undefined) {
        return APIErrorResponse.return_error("payload does not exist", StatusCodes.BAD_REQUEST);
    }

    const invitation_to_load: Invitation = Invitation.parse(params);

    await prisma.tripInvitation.update(
        {
            where: {
                invitationId: invitation_to_load.invitationId ,
            },
            data: {
                status: "REJECTED",
            },
        }
    )

    return NextResponse.json("Invitation was updated successfully.");
}
