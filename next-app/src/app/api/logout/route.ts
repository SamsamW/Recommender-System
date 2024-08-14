import {logout} from "@/utils/authHelper";
import {NextRequest, NextResponse} from "next/server";


export const dynamic = 'force-dynamic'

export async function DELETE(request: NextRequest,{ params } : { params : {userId: string } }) {

    logout()

    return NextResponse.json("Logout")

}