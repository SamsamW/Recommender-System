'use client'
import React, {useEffect, useState} from 'react';
import {Typography, Button} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useRouter} from "next/navigation";
import {UserOnTrip, UserOnTripUser} from "@/types/trip";
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@/types/error";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';


export const Give_preferences_box = (props: UserOnTrip) => {

    const [users, setUsers] = useState<UserOnTripUser[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [usersState, setUsersState] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const getInitial = async () => {

            const userRes = await fetch(`/api/trip/${props.tripId}/user`)

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

            setUsers(user);
            setUsersState(true)

        }
        getInitial()
    }, []);


    const handleClickBox = () => {
        router.push("/trip/" + props.tripId)
    }

    return (
        <Button onClick={() => handleClickBox()}>
            <div style={{display: "flex", flexDirection: "column", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", width: "340px", minHeight: "190px", justifyContent: "center", alignItems: "center", marginTop: "20px", zIndex:"5"}}>

                {usersState &&
                    <>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "30px", flexDirection:"column", gap:"10px"}}>
                    <Typography fontWeight={"bold"} fontSize={"13px"}>Date: {new Date(props.trip.startDate).toDateString()} - {new Date(props.trip.endDate).toDateString()}</Typography>
                    <Typography fontSize={"13px"}>Name: {props.trip.name}</Typography>

                </div>

                <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexFlow: 'row wrap', marginLeft: "20px", marginRight: "20px"}}>
                    {users.map(user => <div key={user.userId}
                                            style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "5px"}}>
                        <Avatar src="/broken-image.jpg" style={{color: "#ffffff", backgroundColor: "#000000"}}/>
                        <Typography fontSize={"10px"}>{user.user.username}</Typography>
                    </div>)}
                </div>
                    </>
                }
                { error && <Typography marginTop={"10px"} style={{color: "red", fontSize: "13px"}}>{error}</Typography>}

            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", zIndex:4, position: "absolute", marginTop: "20px", width: "340px", minHeight: "190px"}}>
                <HourglassEmptyIcon style={{width:"180px", height:"180px", color:"#f4f4f4"}} />
            </div>
        </Button>
    );
};

export default Give_preferences_box;
