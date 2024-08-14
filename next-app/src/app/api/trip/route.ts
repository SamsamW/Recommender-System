import {NextRequest, NextResponse} from 'next/server';
import {z} from "zod";
import prisma from "@/utils/client";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";
import {verifyJwtToken} from "@/utils/authHelper";
import {NotificationType, Status} from "@prisma/client";

const Trip = z.object({
    name: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    users: z.array(z.number())
})
export type Trip = z.infer<typeof Trip>;

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    const body = await request.json();
    const trip_to_insert: Trip = Trip.parse(body);

    const token = request.cookies.get('token');

    if (token === null || token === undefined) {
        return APIErrorResponse.return_error("token does not  exist", StatusCodes.BAD_REQUEST);
    }
    const payload = await verifyJwtToken(token.value);

    if (payload === null || payload === undefined) {
        return APIErrorResponse.return_error("payload does not exist", StatusCodes.BAD_REQUEST);
    }

    const trip = await prisma.trip.create(
        {
            data: {
                name: trip_to_insert.name,
                startDate: trip_to_insert.startDate,
                endDate: trip_to_insert.endDate,
                planningStage: "DESTINATION_SEARCH"
            }
        }
    )

    await prisma.userOnTrip.create(
        {
            data:{
                userId: payload.userId as number,
                tripId: trip.tripId,
                personalState: false
            }
        }
    )

    const to_insert_invitation: {userSendId: number, userRecieveId:number, tripId:number, status: Status}[] = trip_to_insert.users.map(e => {return {userSendId: payload.userId as number, userRecieveId: e, tripId: trip.tripId, status: Status.PENDING}})


    await prisma.tripInvitation.createMany(
        {
            data: to_insert_invitation
        }
    )


    const to_insert_notification: {userId: number, tripId:number, notificationType: NotificationType}[] = trip_to_insert.users.map(u => {return {userId: u, tripId: trip.tripId, notificationType: NotificationType.NEW_TRIP }})

    await prisma.notification.createMany({
        data: to_insert_notification
    })

    return NextResponse.json(trip);
}
