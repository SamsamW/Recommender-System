import {NextRequest, NextResponse} from "next/server";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";
import {verifyJwtToken} from "@/utils/authHelper";
import prisma from "@/utils/client";
import {z} from "zod";

const Trip = z.object({
    tripId: z.number().or(z.string()).transform(Number)
})

type Trip = z.infer<typeof Trip>;

const Questionaire = z.object({
    budget: z.number(),
    destination1: z.string(),
    destination2: z.string(),
    destination3: z.string(),
    destinationRating1: z.number(),
    destinationRating2: z.number(),
    destinationRating3: z.number(),
    hobbies: z.array(z.number()),
    accomondations: z.array(z.string()),
    travelStyles: z.array(z.string()),

})

type Questionaire = z.infer<typeof Questionaire>;

export async function POST(request: NextRequest,{ params } : { params : {tripId: string } }) {

    const token = request.cookies.get('token');

    if (token === null || token === undefined) {
        return APIErrorResponse.return_error("token does not exist", StatusCodes.BAD_REQUEST);
    }
    const payload = await verifyJwtToken(token.value);

    if (payload === null || payload === undefined) {
        return APIErrorResponse.return_error("payload does not exist", StatusCodes.BAD_REQUEST);
    }

    const body = await request.json();
    const questionaire_to_insert: Questionaire = Questionaire.parse(body);

    const trip_to_load: Trip = Trip.parse(params);


    const questionaire = await prisma.groupQuestionaire.create(
        {
            data:
                {
                    userId: payload.userId as number,

                    budget: questionaire_to_insert.budget,

                    destination1: questionaire_to_insert.destination1,
                    destination2: questionaire_to_insert.destination2,
                    destination3: questionaire_to_insert.destination3,

                    destinationRating1: questionaire_to_insert.destinationRating1,
                    destinationRating2: questionaire_to_insert.destinationRating2,
                    destinationRating3: questionaire_to_insert.destinationRating3,

                    hobbies: questionaire_to_insert.hobbies,
                    accomondations: questionaire_to_insert.accomondations,
                    travelStyles: questionaire_to_insert.travelStyles,

                    tripId: trip_to_load.tripId

                }
        }
    )

    await prisma.userOnTrip.updateMany(
        {
            where: {
                AND: [
                    {userId: payload.userId as number},
                    {tripId: trip_to_load.tripId}
                ]
            },
            data: {
                personalState: true
            },
        }
    )

    return NextResponse.json("Trip was updated successfully.");
}
