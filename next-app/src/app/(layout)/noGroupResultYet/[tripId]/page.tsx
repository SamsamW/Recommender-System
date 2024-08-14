'use client'
import {Typography, Button} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {UserOnTripUser} from "@/types/trip";
import {getUserIdFromCookie} from "@/utils/client/authHelper";
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@/types/error";
import CircularProgress from "@mui/material/CircularProgress";

export default function Page ({params}: { params: { tripId: string } })  {
    const router = useRouter()
    const [participants, setParticipants] = useState<UserOnTripUser[]>([]);
    const [loadingDone, setLoadingDone] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null)


    useEffect(() => {
        const getInitial = async () => {
            const id = getUserIdFromCookie();
            if (id === null) {
                router.push("/login")
                return
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
            if (userIndex === -1) {
                router.push("/noSuchTrip")
                return;
            }

            setParticipants(user)
            setLoadingDone(true)
        }
        getInitial()
    }, []);

    const handleClickToYourTrips = () => {
        router.push("/yourTrips")
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "90px", gap: "50px", marginRight:"80px", marginLeft:"80px"}}>
            {!loadingDone ? <CircularProgress size="20px"></CircularProgress>
                :
                <>
            <Typography fontWeight={"bold"} fontSize={"30px"}>Sorry we don’t have any results yet</Typography>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "30px"}}>
                <Typography fontSize={"15px"}> We are still waiting for the preferences of: </Typography>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "20px",
                    flexFlow: 'row wrap'
                }}>

                    {participants.map(n => {
                        if(!n.personalState) {
                            return <div key={n.userId} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <Avatar src="/broken-image.jpg" style={{color: "#ffffff", backgroundColor: "#000000"}}/>
                                <Typography fontSize={"14px"}>{n.user.username}</Typography>
                            </div>
                        }
                    })}

                </div>

            </div>
            {error !== null && <Typography style={{color: "red", fontSize: "13px", marginTop:"20px"}}>{error}</Typography> }
            <Button style={{marginLeft: "900px", marginTop: "20px", width: "200px"}} color={"primary"}
                    variant="contained" onClick={() => handleClickToYourTrips()}>Your Trips overview</Button>

                </>
            }
            </div>
    )
}