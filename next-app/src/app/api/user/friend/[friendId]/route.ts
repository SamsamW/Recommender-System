import {NextRequest, NextResponse} from 'next/server';
import prisma from "@/utils/client";
import {verifyJwtToken} from "@/utils/authHelper";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";
import {z} from "zod";

const Friend = z.object({
    friendId: z.number().or(z.string()).transform(Number)
})

type Friend = z.infer<typeof Friend>;

export const dynamic = 'force-dynamic'

export async function PUT(request: NextRequest,{ params } : { params : {friendId: string } }) {

    const token = request.cookies.get('token');

    if (token === null || token === undefined) {
        return APIErrorResponse.return_error("token does not exist", StatusCodes.BAD_REQUEST);
    }
    const payload = await verifyJwtToken(token.value);

    if (payload === null || payload === undefined) {
        return APIErrorResponse.return_error("payload does not exist ", StatusCodes.BAD_REQUEST);
    }

    const friend_to_load: Friend = Friend.parse(params);

    await prisma.isFriendOf.create(
        {
            data: {
                userId: payload.userId as number,
                friendOfUserId: friend_to_load.friendId,
                updatedAt: new Date(),
            }
        }
    )


    return NextResponse.json("Friend was updated successfully.");
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

    const friend_to_load: Friend = Friend.parse(params);

    await prisma.isFriendOf.deleteMany(
        {
            where: {
                AND: [
                    {userId: payload.userId as number},
                    {friendOfUserId: friend_to_load.friendId}
                ]
            },
        }
    )

    return NextResponse.json("Friend was updated successfully.");
}
