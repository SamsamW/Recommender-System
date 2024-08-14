import {NextRequest, NextResponse} from 'next/server';
import {z} from "zod";
import prisma from "@/utils/client";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";
import {verifyJwtToken} from "@/utils/authHelper";
import {DayNightType, TravelPace, GroupSize} from "@prisma/client";

const Questionaire = z.object({
    startDate: z.string(),
    endDate: z.string(),
    reliabilityRating: z.number(),
    flexibilityRating: z.number(),
    organizationRating: z.number(),
    sociabilityRating: z.number(),
    sharedInterestsRating: z.number(),
    daynightPreference: z.string(),
    travelPacePreference: z.string(),
    foodPreference: z.number(),
    groupSizePreference: z.string(),

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
export type Questionaire = z.infer<typeof Questionaire>;

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    const body = await request.json();
    const questionaire_to_insert: Questionaire = Questionaire.parse(body);

    const token = request.cookies.get('token');

    if (token === null || token === undefined) {
        return APIErrorResponse.return_error("token does notexist", StatusCodes.BAD_REQUEST);
    }
    const payload = await verifyJwtToken(token.value);

    if (payload === null || payload === undefined) {
        return APIErrorResponse.return_error("payload does not exist", StatusCodes.BAD_REQUEST);
    }

    let daynightPreference:DayNightType = DayNightType.FLEXIBLE

    if(questionaire_to_insert.daynightPreference === "nightOwl"){
        daynightPreference = DayNightType.NIGHTOWL
    }

    else if(questionaire_to_insert.daynightPreference === "earlybird"){
        daynightPreference = DayNightType.EARLYBIRD
    }

    else if(questionaire_to_insert.daynightPreference === "flexible"){
        daynightPreference = DayNightType.FLEXIBLE
    }



    let groupSizePreference: GroupSize = GroupSize.MEDIUM

    if(questionaire_to_insert.groupSizePreference === "small"){
        groupSizePreference = GroupSize.SMALL
    }

    if(questionaire_to_insert.groupSizePreference === "medium"){
        groupSizePreference = GroupSize.MEDIUM
    }

    if(questionaire_to_insert.groupSizePreference === "big"){
        groupSizePreference = GroupSize.BIG
    }


    let travelPacePreference: TravelPace = TravelPace.MEDIUM

    if(questionaire_to_insert.travelPacePreference === "fast-paced"){
        travelPacePreference = TravelPace.FAST
    }

    if(questionaire_to_insert.travelPacePreference === "moderate"){
        travelPacePreference = TravelPace.MEDIUM
    }

    if(questionaire_to_insert.travelPacePreference === "slow-paced"){
        travelPacePreference = TravelPace.SLOW
    }



    const questionaire = await prisma.matchQuestionaire.create(
        {
            data: {
                startDate: questionaire_to_insert.startDate,
                endDate: questionaire_to_insert.endDate,

                reliabilityRating: questionaire_to_insert.reliabilityRating,
                flexibilityRating: questionaire_to_insert.flexibilityRating,
                organizationRating: questionaire_to_insert.organizationRating,
                sharedInterestsRating: questionaire_to_insert.sharedInterestsRating,
                sociabilityRating: questionaire_to_insert.sociabilityRating,

                daynightPreference: daynightPreference,
                groupSizePreference: groupSizePreference,
                travelPacePreference: travelPacePreference,
                foodPreference: questionaire_to_insert.foodPreference,

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

                userId: payload.userId as number,
            }
        }
    )

    return NextResponse.json(questionaire);
}
