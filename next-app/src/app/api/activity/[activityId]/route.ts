import prisma from "@/utils/client";
import {z} from "zod";
import {NextRequest, NextResponse} from "next/server";

const Activity = z.object({
    activityId: z.number().or(z.string()).transform(Number)
})

type Activity = z.infer<typeof Activity>;

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest,{ params } : { params : {activityid: string } }) {

    const activity_to_load: Activity = Activity.parse(params);

    const activity = await prisma.activity.findFirst(
        {
            where: {
                activityId: activity_to_load.activityId
            },
        }
    )


    return NextResponse.json(activity);
}

