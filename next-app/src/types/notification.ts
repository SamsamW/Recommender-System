import {Trip, User} from "@prisma/client";

export interface Notification {
    notificationId: number
    notificationType: string
    userId: number
    tripId: number
    trip: Trip
    createdAt: Date
}

export interface Invitation {
    invitationId: number,
    status: string,

    userSend: User
}