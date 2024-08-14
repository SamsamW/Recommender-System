import {NextResponse} from 'next/server';
import {z} from "zod";
import * as argon2 from "argon2";
import prisma from "@/utils/client";
import { Occupation, Gender}  from '@prisma/client'
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";

const R_User = z.object({
    email: z.string().email(),
    username: z.string(),
    age: z.number(),
    gender: z.string(),
    occupation: z.string(),
    password: z.string()
})
export type User = z.infer<typeof R_User>;

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const body = await request.json();
    const user_to_insert: User = R_User.parse(body);

    if (await prisma.user.findFirst (
        {
            where: {
                OR: [
                    {username: user_to_insert.username},
                    {email: user_to_insert.email}
                ]
            }
        },
    ) !== null) {
        return APIErrorResponse.return_error("User already exists", StatusCodes.BAD_REQUEST);
    }

    let gender_to_set = null
    if(user_to_insert.gender === "female"){
        gender_to_set = Gender.FEMALE
    }
    if(user_to_insert.gender === "male"){
        gender_to_set = Gender.MALE
    }
    if(user_to_insert.gender === "diverse"){
        gender_to_set = Gender.DIVERSE
    }

    let occupation_to_set: Occupation = Occupation.WORKING
    if(user_to_insert.occupation === "working"){
        occupation_to_set = Occupation.WORKING}
    if(user_to_insert.occupation === "student"){
        occupation_to_set = Occupation.STUDENT}
    if(user_to_insert.occupation === "retired"){
        occupation_to_set = Occupation.RETIRED}
    if(user_to_insert.occupation === "unemployed"){
        occupation_to_set = Occupation.UNEMPLOYED
    }

    const salt = crypto.randomUUID();
    user_to_insert.password = await argon2.hash(user_to_insert.password + salt);

    await prisma.user.create(
        {
            data: {
                username: user_to_insert.username,
                email: user_to_insert.email,
                age: user_to_insert.age,
                gender: gender_to_set,
                occupation: occupation_to_set,
                password: user_to_insert.password,
                salt: salt,
                updatedAt: new Date(),
            }
        }
    )


    return NextResponse.json("User was inserted successfully.");
}
