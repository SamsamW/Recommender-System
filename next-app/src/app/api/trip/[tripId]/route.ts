import prisma from "@/utils/client";
import {z} from "zod";
import {NextRequest, NextResponse} from "next/server";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";

const Trip = z.object({
    tripId: z.number().or(z.string()).transform(Number)
})

type Trip = z.infer<typeof Trip>;

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest,{ params } : { params : {tripId: string } }) {

    const trip_to_load: Trip = Trip.parse(params);

    const trip = await prisma.trip.findFirst(
        {
            where: {
                tripId: trip_to_load.tripId
            },
            include:{
                destination:true
            }
        }
    )

    if(trip === null){
        return APIErrorResponse.return_error("No trip found", StatusCodes.BAD_REQUEST);
    }
    else{
        return NextResponse.json(trip);
    }
}

