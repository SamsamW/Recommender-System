'use client'
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import * as React from "react";
import {useRouter} from "next/navigation";
import {getUserIdFromCookie} from "@/utils/client/authHelper";
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@/types/error";
import {Activities, Trip, UserOnTripUser} from "@/types/trip"
import {PlanningStage} from "@prisma/client";
import styles from "./trip.module.css"
import Link from "next/link";
import {ActivityBox} from "@/components/ActivityBox";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export default function Page({params}: { params: { tripId: string } }) {

    const [userMe, setUserMe]= useState<UserOnTripUser|null>(null);
    const [participants, setParticipants] = useState<UserOnTripUser[]>([]);
    const [activities, setActivities] = useState<Activities[]>([])
    const [error, setError] = useState<string|null>(null)
    const [trip, setTrip] = useState<Trip|null>(null)
    const [activitiesState, setActivitiesState] = useState<boolean>(false)
    const router = useRouter();

    useEffect(() => {
        const getInitial = async () => {
            const id = getUserIdFromCookie();
            if (id === null) {
                router.push("/login")
            }

            const userRes = await fetch(`/api/trip/${Number(params.tripId)}/user`)

            if (!userRes.ok) {
                if (userRes.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await userRes.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${userRes.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const user: UserOnTripUser[] = await userRes.json();

            const userIndex = user.findIndex(e => (e.userId === id))
            if(userIndex === -1){
                router.push("/noTripFound")
                return;
            }

            setUserMe(user[userIndex])

            setParticipants(user)


            const tripRes = await fetch(`/api/trip/${Number(params.tripId)}`)

            if (!tripRes.ok) {
                if (tripRes.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await tripRes.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${tripRes.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const tripQueried: Trip = await tripRes.json();

            if(tripQueried === null) {
                router.push("/noTripFound")
                return
            }
            setTrip(tripQueried);


            const activitiesRes = await fetch(`/api/trip/${Number(params.tripId)}/activities`)

            if (!activitiesRes.ok) {
                if (activitiesRes.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await activitiesRes.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${activitiesRes.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const activitiesQueried: Activities[] = await activitiesRes.json();

            setActivities(activitiesQueried);
            setActivitiesState(true)
        }
        getInitial()
    }, []);

    const handleClickFillOutPage = () => {
        router.push("/groupInterests/" + Number(params.tripId))
    }

    return (
        <div style={{margin: "20px", display: "flex", flexDirection: "column", gap:"50px"}}>
            {!activitiesState ?
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{width: "500px", height: "300px", backgroundColor: "#e0e0e0"}}>
                        <div style={{width: '500px', height: '300px'}} className={styles.skeleton} />
                    </div>
                    <div style={{margin: "50px", display: "flex", flexDirection: "column", gap: "7px"}}>
                        <div style={{width: '400px', height: '23px'}} className={styles.skeleton}/>

                        <div style={{width: '400px', height: '23px'}} className={styles.skeleton}/>

                        <div style={{width: '400px', height: '23px'}} className={styles.skeleton}/>

                        <div style={{width: '400px', height: '63px'}} className={styles.skeleton}/>

                    </div>
                </div>
                :
<>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{width: "500px", height: "300px", zIndex:"5"}}>
                        {trip?.destination !== null ?
                        <div style={{
                            width: '500px',
                            height: '300px',
                            backgroundImage: `url(${trip?.destination?.image})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center",
                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                        }}/>
                            :
                        <div style={{
                            display:"flex",
                            width: '500px',
                            height: '300px',
                            zIndex:"3",
                            backgroundColor: "#e0e0e0",
                            alignItems:"center",
                            justifyContent:"center",
                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                        }}><HourglassEmptyIcon style={{color:"white", width:"200px", height:"200px"}} />
                        </div>
                        }
                    </div>
                    <div style={{margin: "50px", display: "flex", flexDirection: "column", gap: "20px"}}>
                        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                            <Typography fontWeight={"bold"} fontSize={"14px"}> Destination: </Typography>
                            {trip !== null && trip.destination !== null && <Typography fontWeight={"bold"}
                                                                                   fontSize={"14px"}>{trip.destination.city}, {trip.destination.country}</Typography>}
                    </div>
                    <Typography fontSize={"14px"}> Name: {trip?.name}</Typography>

                    <Typography fontSize={"14px"}> Date: {trip !== null && new Date(trip.startDate).toDateString()} - {trip !== null && new Date(trip.endDate).toDateString()}</Typography>

                    <Typography fontSize={"14px"}> Participants: {participants.map(user => <Link key={user.userId}
                                                                                                 href={"/user/" + user.userId}>{user.user.username} </Link>)}</Typography>
                    {error !== null && <Typography style={{color: "red", fontSize: "13px"}}>{error}</Typography>}
                    {trip !== null && trip?.planningStage !== PlanningStage.FINISHED && userMe?.personalState === false &&
                        <Button style={{width: "150px", marginTop: "40px"}} color="primary" size={"small"}
                                variant="contained" onClick={() => handleClickFillOutPage()}>Fill out
                            questionair</Button>}
                    {trip !== null && trip?.planningStage !== PlanningStage.FINISHED && userMe?.personalState === true &&
                        <Typography marginTop={"40px"} fontWeight={"bold"} fontSize={"14px"}>you have already filled out
                            the form - we are currently waiting for the others</Typography>}

                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <Typography fontWeight={"bold"} fontSize={"14px"}> Recommended Activities: </Typography>

            <div style={{display:"flex", flexDirection: "row", gap:"30px", flexWrap: "wrap"}}>
                {activities.map((activity) =>
                    <div key={activity.activityId}>
                       <ActivityBox {...activity}></ActivityBox>
                    </div>)}
            </div>
            </div>
</>
}
        </div>
    )
}
