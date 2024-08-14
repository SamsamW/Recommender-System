import {NextRequest, NextResponse} from 'next/server';
import {z} from "zod";
import prisma from "@/utils/client";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";
import {verifyJwtToken} from "@/utils/authHelper";

const PrevTrip = z.object({
    destinationId: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    budget: z.number(),
    rating: z.number(),
    keywords: z.array(z.number())
})
export type PrevTrip = z.infer<typeof PrevTrip>;

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    const body = await request.json();
    const trip_to_insert: PrevTrip = PrevTrip.parse(body);

    const token = request.cookies.get('token');

    if (token === null || token === undefined) {
        return APIErrorResponse.return_error("token  does not exist", StatusCodes.BAD_REQUEST);
    }
    const payload = await verifyJwtToken(token.value);

    if (payload === null || payload === undefined) {
        return APIErrorResponse.return_error("payload does not exist", StatusCodes.BAD_REQUEST);
    }

    const trip = await prisma.previousTrip.create(
        {
            data: {
                rating: trip_to_insert.rating,
                budget: trip_to_insert.budget,
                startDate: trip_to_insert.startDate,
                endDate: trip_to_insert.endDate,
                userId: payload.userId as number,
                destinationId: trip_to_insert.destinationId,
                updatedAt: new Date(),
            }
        }
    )

    const to_insert: {previousTripId: number, keywordPreviousTripId:number}[] = trip_to_insert.keywords.map(e => {return {previousTripId: trip.previousTripId, keywordPreviousTripId: e}})

    await prisma.keywordsOfPreviousTrip.createMany(
        {
            data: to_insert
        }
    )

    return NextResponse.json("previous trip was inserted successfully.");
}
