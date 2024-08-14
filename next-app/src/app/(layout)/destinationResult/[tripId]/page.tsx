'use client'
import {Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {UserOnTripUser} from "@/types/trip";
import {getUserIdFromCookie} from "@/utils/client/authHelper";
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@/types/error";
import {useRouter} from "next/navigation";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Page({params}: { params: { tripId: string } }) {

    const [participants, setParticipants] = useState<UserOnTripUser[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [loadingDone, setLoadingDone] = useState<boolean>(false);

    const router = useRouter()

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
                    setError(`Request Error (${userRes.status}): Something went wrong. Please try again later. `);
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


    const handleClickContinue = () => {
        router.push("/yourTrips")
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "50px",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "80px",
            marginRight: "80px"
        }}>

            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography fontWeight={"bold"} fontSize={"35px"}>Congratulations</Typography>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "30px",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Typography fontSize={"15px"}>All questionairs were filled out by your friends!</Typography>
                    <Typography fontSize={"15px"}> We are currently calculating your result. You will get a notification
                        when your result is ready :) </Typography>
                </div>
            </div>
            <Box sx={{display: 'flex', margin: "50px"}}>
                <CircularProgress/>
            </Box>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "20px"}}>
                {loadingDone && <>
                    <Typography fontWeight={"bold"} fontSize={"15px"}> you are going with: </Typography>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "20px",
                        flexFlow: 'row wrap'
                    }}>

                        {participants.map(p => <div key={p.userId} style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <Avatar src="/broken-image.jpg" style={{color: "#ffffff", backgroundColor: "#000000"}}/>
                            <Typography fontSize={"14px"}>{p.user.username}</Typography>
                        </div>)}
                    </div>
                    {error !== null &&
                        <Typography style={{color: "red", fontSize: "13px", marginTop: "20px"}}>{error}</Typography>}
                    <Button style={{marginLeft: "900px", marginTop: "20px", width: "200px"}} color={"primary"}
                            variant="contained" onClick={() => handleClickContinue()}>Go to your trips</Button>
                </>}
            </div>
        </div>
    )
}