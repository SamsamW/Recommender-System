import prisma from "@/utils/client";
import {z} from "zod";
import {NextRequest, NextResponse} from "next/server";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";

const Trip = z.object({
    previousTripId: z.number().or(z.string()).transform(Number)
})

type Trip = z.infer<typeof Trip>;

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest,{ params } : { params : {previousTripId: string } }) {


    const trip_to_load: Trip = Trip.parse(params);

    const keywords = await prisma.keywordsOfPreviousTrip.findMany(
        {
            where: {
                previousTripId: trip_to_load.previousTripId
            },
            include: {
                keywordPreviousTrip: true
            },
        }
    )


    if(keywords === null){
        return APIErrorResponse.return_error("No notifications found", StatusCodes.BAD_REQUEST);
    }
    else{
        return NextResponse.json(keywords);
    }
}

