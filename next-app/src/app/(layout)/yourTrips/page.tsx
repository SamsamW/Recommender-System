'use client'
import {Typography} from "@mui/material";
import Give_preferences_box from "@/app/components/your_trips_page/Give_preferences_box";
import Finished_planning_box from "@/app/components/your_trips_page/Finished_planning_box";
import {useEffect, useState} from "react";
import {UserOnTrip} from "@/types/trip"
import {getUserIdFromCookie} from "@/utils/client/authHelper";
import {useRouter} from "next/navigation";
import {PlanningStage, MatchQuestionaire} from "@prisma/client";
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@/types/error";
import * as React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import WaitingForAMatchBox from "@/app/components/your_trips_page/WaitingForAMatchBox";


export default function Page() {

    const [preferenceTrips, setPreferenceTrips] = useState<UserOnTrip[]>([]);
    const [waitingTrips, setWaitingTrips] = useState<UserOnTrip[]>([]);
    const [finishedTrips, setFinishedTrips] = useState<UserOnTrip[]>([]);
    const [tripsToMatch, setTripsToMatch] = useState<MatchQuestionaire[]>([]);
    const router = useRouter()
    const [tripsState, setTripsState] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getInitial = async () => {

            const id = getUserIdFromCookie();
            if (id === null) {
                router.push("/login")
            }

            const matchRes = await fetch(`/api/matchQuestionaire/user/${id}`)

            if (!matchRes.ok) {
                if (matchRes.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await matchRes.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${matchRes.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const trips_to_match: MatchQuestionaire[] = await matchRes.json();

            setTripsToMatch(trips_to_match)

            const tripsRes = await fetch(`/api/user/${id}/trip`)

            if (!tripsRes.ok) {
                if (tripsRes.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await tripsRes.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${tripsRes.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const trips: UserOnTrip[] = await tripsRes.json();

            const finished: UserOnTrip[] = []
            const preference: UserOnTrip[] = []
            const waiting: UserOnTrip[] = []

            trips.forEach(e => {
                    if (e.trip.planningStage === PlanningStage.FINISHED) {
                        finished.push(e)
                    } else if (!e.personalState) {
                        preference.push(e)
                    } else if (e.personalState) {
                        waiting.push(e)
                    }
                }
            )

            setPreferenceTrips(preference)
            setWaitingTrips(waiting)
            setFinishedTrips(finished)
            setTripsState(true)

        }
        getInitial()
    }, []);

    return (
        <>
            {!tripsState ?
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80vw",
                    height: "80vh",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <CircularProgress size={"20px"}></CircularProgress>
                </div>
                :
                <div style={{marginBottom:"20px"}}>
                    <div style={{marginBottom: "50px", marginTop: "20px"}}>
                        {error &&
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "left",
                                marginLeft: "30px",
                                marginBottom: "10px"
                            }}>
                                <Typography style={{color: "red", fontSize: "13px"}}>{error}</Typography></div>}
                        <div style={{display: "flex", flexDirection: "column", alignItems: "left", marginLeft: "30px"}}>
                            <Typography fontWeight={"bold"} fontSize={"14px"}>It is your turn to give
                                preferences!</Typography>
                        </div>
                        <div style={{display: "flex", marginLeft: "30px", flexFlow: 'row wrap', gap: "15px"}}>
                            {preferenceTrips.map((trip) => (
                                <Give_preferences_box key={trip.tripId} {...trip} />
                            ))}
                        </div>
                    </div>

                    <div style={{marginBottom: "50px"}}>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "left", marginLeft: "30px"}}>
                            <Typography fontWeight={"bold"} fontSize={"14px"}>Waiting for friends...</Typography>
                        </div>
                        <div style={{display: "flex", marginLeft: "30px", flexFlow: 'row wrap', gap: "15px"}}>
                            {waitingTrips.map((trip) => (
                                <Give_preferences_box key={trip.tripId} {...trip} />
                            ))}
                        </div>

                    </div>
                    <div style={{marginBottom: "50px"}}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",
                            marginLeft: "30px"
                        }}>
                            <Typography fontWeight={"bold"} fontSize={"14px"}>Waiting for a match...</Typography>
                        </div>
                        <div style={{display: "flex", marginLeft: "38px", flexFlow: 'row wrap', gap: "30px"}}>
                            {tripsToMatch.map((trip) => (
                                <WaitingForAMatchBox key={trip.MatchQuestionaireId} {...trip} />
                            ))}
                        </div>
                    </div>


                    <div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",
                            marginLeft: "30px"
                        }}>
                            <Typography fontWeight={"bold"} fontSize={"14px"}>Finished planning</Typography>
                            <div style={{display: "flex", flexFlow: "row wrap"}}>
                                {finishedTrips.map((trip) => (
                                    <Finished_planning_box key={trip.tripId} {...trip} />
                                ))}

                            </div>


                        </div>
                    </div>

                </div>
            }
        </>


    )
}