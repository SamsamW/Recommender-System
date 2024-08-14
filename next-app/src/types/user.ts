import {z} from "zod";
import {Interest, User as User_db} from "@prisma/client";

export const Z_User = z.object({
    username: z.string(),
    userId: z.number(),
    password: z.string()
})

export type Z_User = z.infer<typeof Z_User>;


export const User = z.object({
    userId: z.number(),
    username: z.string(),
    email: z.string(),
    gender: z.string(),
    age: z.number(),
    occupation: z.string(),
    bio: z.string(),
})

export type User = z.infer<typeof User>;

export interface Interests {
    userId: number,
    interest: Interest
}

export interface InterestsMapped {
    interest: string,
    interestId: number,
}

export interface Friends {
    userId: number,
    friendOfUser: User,
    friendOfUserId: number
}

export interface Friend {
    userId: number,
    friendOfUserId: number
    friendOfUser: User_db
}