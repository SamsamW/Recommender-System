'use client'
import Grid from "@mui/material/Grid";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {Notification, Invitation} from "@/types/notification";
import {useRouter} from "next/navigation";
import {Status} from "@prisma/client"
import {StatusCodes} from "http-status-codes";
import Link from 'next/link'
import {ErrorResponse} from "@/types/error";


export const NewTripBox = (props: Notification) =>{
    const [invitation, setInvitation] = useState<Invitation | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

        useEffect(() => {
            const getInitial = async () => {


                const invitationRes = await fetch(`/api/invitation/trip/${props.tripId}`)
                const invitation: Invitation = await invitationRes.json();

                setInvitation(invitation)

            }
            getInitial()
        }, []);

    const handleClick = async (accepted: boolean) => {
        if (invitation === null){
            setError("No invitation could be found.");
            return;
        }

        const res = await fetch(
            `/api/invitation/${invitation?.invitationId}/trip/${props.tripId}`,
            {method: accepted ? "PUT" : "DELETE"}
        );

        if (!res.ok) {
            if (res.status === StatusCodes.BAD_REQUEST){
                const error: ErrorResponse = await res.json()
                setError(`Request Error: ${error.message}`);
                return;
            } else {
                setError(`Request Error (${res.status}): Something went wrong. Please try again later.`);
                return;
            }
        }

        if(accepted){
                setInvitation(prev => ( prev ? {...prev, "status": Status.ACCEPTED} : null))

        }
        else{
            setInvitation(prev => ( prev ? {...prev, "status": Status.REJECTED} : null))
        }
    }

    const handleClickGoToTrip = () => {
        router.push(`/trip/${props.tripId}`)
    }

    return (
        <div style={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",minHeight:"120px", display:"flex", alignItems:"center", justifyContent:"center",  marginRight:"40px", marginLeft:"40px", marginTop:"20px"}}>

            <Grid container marginTop={"20px"} marginBottom={"20px"}>
                <Grid item xs={1.5} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <AirplanemodeActiveIcon style={{height:"60px", width:"60px"}}></AirplanemodeActiveIcon>
                </Grid>
                <Grid item xs={7} display={"flex"} justifyContent={"center"} flexDirection={"column"} gap={"5px"}>
                    <Typography fontSize={"16px"} fontWeight={"bold"}>New Trip!</Typography>
                    <div style={{display:"flex", gap:"5px", flexDirection:"column"}}>
                        <Typography fontSize={"14px"}>User <Link style={{textDecoration: 'underline'}} href={"/user/" + invitation?.userSend.userId} >{invitation?.userSend.username}</Link> invited you on a trip! Date: {new Date(props.trip.startDate).toDateString()} - {new Date(props.trip.endDate).toDateString()} </Typography>
                        <Typography fontSize={"14px"}> tripname: {props.trip.name}</Typography>
                    </div>
                </Grid>
                <Grid item xs={3.5} display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"15px"} flexDirection={"column"}>
                    {invitation !== null &&
                        <>
                    {invitation?.status ===  Status.PENDING && <Button style={{width: "100px"}} color={"primary"} variant="contained" onClick={() => handleClick(true)}>Accept</Button>}
                    {invitation?.status === Status.PENDING  &&<Button style={{width: "100px"}} color={"primary"} variant="contained" onClick={() => handleClick(false)}>Reject</Button>}
                    {invitation?.status === Status.ACCEPTED  && <Typography fontWeight={"bold"}>Accepted!</Typography>}
                    {invitation?.status === Status.REJECTED && <Typography fontWeight={"bold"}>Rejected!</Typography>}
                    {invitation?.status === Status.ACCEPTED  && <Button style={{width: "170px"}} color={"primary"} variant="outlined" onClick={() => handleClickGoToTrip()}>Go to trip page</Button>}
                        </>
                    }
                    </Grid>
            </Grid>

            { error && <Typography style={{color: "red", fontSize: "13px"}}>{error}</Typography> }
        </div>
    )
}