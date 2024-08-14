import {User, PlanningStage, Destination, Activity, KeywordPreviousTrip} from "@prisma/client";

export interface UserOnTrip{
    tripId: number,
    trip: Trip,
    userId: number

    personalState: boolean
}


export interface UserOnTripUser{
    tripId: number,
    userId: number
    user: User

    personalState: boolean
}


export interface Trip {
    tripId: number,
    name: string,
    startDate: Date,
    endDate: Date,

    planningStage: PlanningStage,

    destination: Destination,
    destinationId: number
}


export interface Activities {
    tripId: number,
    activityId: number,
    activity: Activity
}


export interface DestinationMapped {
    city: string,
    destinationId: number,
    country: string
}

export interface PreviousTripWithDestination {
    previousTripId: number,
    rating: number,
    budget: number,

    startDate: Date,
    endDate: Date,

    destination: Destination,
    destinationId: number
}

export interface KeywordsOfPreviousTrip {
    previousTripId: number,
    keywordPreviousTripId: number,
    keywordPreviousTrip: KeywordPreviousTrip
}