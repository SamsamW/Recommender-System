import {NextRequest, NextResponse} from "next/server";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";
import {verifyJwtToken} from "@/utils/authHelper";
import prisma from "@/utils/client";
import {z} from "zod";
import {NotificationType, PlanningStage} from "@prisma/client"

const Trip = z.object({
    tripId: z.number().or(z.string()).transform(Number)
})

type Trip = z.infer<typeof Trip>;


const Users = z.object({
    userId: z.array(z.number())
})

export type Users = z.infer<typeof Users>;

export async function PATCH(request: NextRequest,{ params } : { params : {tripId: string } }) {

    const body = await request.json();
    const users: Users = Users.parse(body);

    const token = request.cookies.get('token');

    if (token === null || token === undefined) {
        return APIErrorResponse.return_error("token does not exist", StatusCodes.BAD_REQUEST);
    }
    const payload = await verifyJwtToken(token.value);

    if (payload === null || payload === undefined) {
        return APIErrorResponse.return_error("payload does not exist", StatusCodes.BAD_REQUEST);
    }

    const trip_to_load: Trip = Trip.parse(params);

    await prisma.trip.update(
        {
            where: {
                tripId: trip_to_load.tripId
            },
            data: {
                planningStage: PlanningStage.FINISHED
            }
        }
    )

    await prisma.userOnTrip.updateMany(
        {
            where: {
                    tripId: trip_to_load.tripId

            },
            data: {
                personalState: false
            },
        }
    )

    const to_insert: {notificationType: NotificationType, userId: number, tripId:number}[] = users.userId.map(e => {return {notificationType: NotificationType.FINISHED ,userId: e, tripId: trip_to_load.tripId}})

    await prisma.notification.createMany(
        {
            data: to_insert
        }
    )

    return NextResponse.json("Notifications and trip were updated successfully.");
}
