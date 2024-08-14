import prisma from "@/utils/client";
import {z} from "zod";
import {NextRequest, NextResponse} from "next/server";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";

const User = z.object({
    userId: z.number().or(z.string()).transform(Number)
})

type User = z.infer<typeof User>;

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest,{ params } : { params : {userId: string } }) {

    const user_to_load: User = User.parse(params);

    const trips = await prisma.userOnTrip.findMany(
        {
            where: {
                userId: user_to_load.userId
            },
            include: {
                trip: {
                    include: {
                        destination: true
                    }
                }
            },
        }
    )


    if(trips === null){
        return APIErrorResponse.return_error("No trips found", StatusCodes.BAD_REQUEST);
    }
    else{
        return NextResponse.json(trips);
    }
}

