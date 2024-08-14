import {NextRequest, NextResponse} from 'next/server';
import {z} from "zod";
import prisma from "@/utils/client";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";
import {verifyJwtToken} from "@/utils/authHelper";

const Interests = z.object({
    interest: z.array(z.number())
})
export type Interests = z.infer<typeof Interests>;

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    const body = await request.json();
    const interests: Interests = Interests.parse(body);
    const token = request.cookies.get('token');

    if (token === null || token === undefined) {
        return APIErrorResponse.return_error("token does not exist", StatusCodes.BAD_REQUEST);
    }
    const payload = await verifyJwtToken(token.value);

    if (payload === null || payload === undefined) {
        return APIErrorResponse.return_error("payload does not exist", StatusCodes.BAD_REQUEST);
    }

    await prisma.interestOfUser.deleteMany({
        where: {
            userId: payload.userId as number,
        },
    })


    const to_insert: {userId: number, interestId:number}[] = interests.interest.map(e => {return {userId: payload.userId as number, interestId: e}})

    await prisma.interestOfUser.createMany(
        {
            data: to_insert
        }
    )


    return NextResponse.json("Interests were updated successfully.");
}
