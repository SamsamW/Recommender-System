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

    const interests = await prisma.notification.findMany(
        {
            where: {
                userId: user_to_load.userId
            },
            include: {
                trip: true,
            },
        }
    )


    if(interests === null){
        return APIErrorResponse.return_error("No notifications found", StatusCodes.BAD_REQUEST);
    }
    else{
        return NextResponse.json(interests);
    }
}

