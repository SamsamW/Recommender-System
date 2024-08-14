'use client'
import * as React from "react";
import Grid from '@mui/material/Grid';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import {Interests, InterestsMapped, User, Friends} from "@/types/user";
import {getUserIdFromCookie} from "@/utils/client/authHelper";
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@/types/error";
import {PreviousTripWithDestination} from "@/types/trip";
import {PreviousTripBox} from "@/components/PreviousTripBox";
import styles from "@/app/(layout)/profile/profile.module.css";
import CircularProgress from '@mui/material/CircularProgress';


export default function Page({params}: { params: { userId: string } }) {

    const [user, setUser] = useState<User | null>(null);
    const [isFriend, setIsFriend] = useState<boolean>(false);
    const [isSame, setIsSame] = useState<boolean>(true);
    const [newInterests, setNewInterests] = useState<InterestsMapped[]>([])
    const [interestsState, setInterestsState] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    const [previousTrips, setPreviousTrips] = useState<PreviousTripWithDestination[]>([])
    const [previousTripsState, setPreviousTripsState] = useState<boolean>(false)

    const router = useRouter()


    useEffect(() => {
        const getInit = async () => {

            const id = getUserIdFromCookie();
            if (id === null) {
                router.push("/login")
                return
            }

            if (id !== Number(params.userId)) {
                setIsSame(false)
            }

            const userRes = await fetch(`/api/user/${Number(params.userId)}`)
            const user: User = await userRes.json();

            setUser(user);

            const interestsRes = await fetch(`/api/user/interests/${Number(params.userId)}`)
            if (!interestsRes.ok) {
                if (interestsRes.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await interestsRes.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${interestsRes.status}): Something went wrong. Please try again later...`);
                    return;
                }
            }

            const interests: Interests[] = await interestsRes.json();
            const interstsMapped: InterestsMapped[] = interests.map(e => ({
                interestId: e.interest.interestId,
                interest: e.interest.interest
            }));

            setNewInterests(interstsMapped)
            setInterestsState(true)


            const friendsRes = await fetch(`/api/user/friends`)
            if (!friendsRes.ok) {
                if (friendsRes.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await friendsRes.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${friendsRes.status}): Something went wrong. Please try again later...`);
                    return;
                }
            }
            const friends: Friends[] = await friendsRes.json()

            if (friends.some(el => el.friendOfUserId === Number(params.userId))) {
                setIsFriend(true);
            } else {
                setIsFriend(false);
            }

            const prevTripRes = await fetch(`/api/previousTrip/user/${params.userId}`)
            if (!prevTripRes.ok) {
                if (prevTripRes.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await prevTripRes.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error(${prevTripRes.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const prevTrip: PreviousTripWithDestination[] = await prevTripRes.json();

            setPreviousTrips(prevTrip.sort((a, b) => new Date(b.startDate).getFullYear() - new Date(a.startDate).getFullYear() || new Date(b.startDate).getMonth() - new Date(a.startDate).getMonth() || new Date(b.startDate).getDate() - new Date(a.startDate).getDate()))
            setPreviousTripsState(true)

        }
        getInit()
    }, []);


    const followFriend = async () => {
        const res = await fetch(`/api/user/friend/${Number(params.userId)}`, {method: "PUT"})
        if (!res.ok) {
            if (res.status === StatusCodes.BAD_REQUEST) {
                const error: ErrorResponse = await res.json()
                setError(`Request Error: ${error.message}`);
                return;
            } else {
                setError(`Request Error (${res.status}): Something went wrong. Please try again later.`);
                return;
            }
        }
        setError(null)
        setIsFriend(true);
    }

    const unfollowFriend = async () => {
        const res = await fetch(`/api/user/friend/${Number(params.userId)}`, {method: "DELETE"})
        if (!res.ok) {
            if (res.status === StatusCodes.BAD_REQUEST) {
                const error: ErrorResponse = await res.json()
                setError(`Request Error: ${error.message}`);
                return;
            } else {
                setError(`Request Error (${res.status}): Something went wrong. Please try again later.`);
                return;
            }
        }
        setError(null)
        setIsFriend(false);
    }
    return (
        <>
            <div style={{margin: "50px"}}>
                {!interestsState ?
                    <Grid container>
                        <Grid item xs={3.5} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <div>
                                <div className={styles.skeleton}
                                     style={{height: '140px', width: '140px', borderRadius: "100%"}}></div>
                            </div>
                        </Grid>
                        <Grid item xs={6.5} style={{display: "flex", alignItems: "center"}}>
                            <div style={{
                                display: "flex", gap: "7px", flexDirection: "column"
                            }}>
                                <div className={styles.skeleton} style={{width: "500px", height: "20px"}}></div>
                                <div className={styles.skeleton} style={{width: "500px", height: "20px"}}></div>
                                <div className={styles.skeleton} style={{width: "500px", height: "50px"}}></div>
                            </div>
                        </Grid>
                        <Grid item xs={2} style={{display: "flex", alignItems: "center"}}/>
                    </Grid>
                    :
                    <Grid container>
                        <Grid item xs={3.5} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <div>
                                <Avatar src="/broken-image.jpg" sx={{height: '150px', width: '150px'}}
                                        style={{color: "#ffffff", backgroundColor: "#000000"}}/>
                            </div>
                        </Grid>
                        <Grid item xs={6.5} style={{display: "flex", alignItems: "center"}}>
                            <div style={{
                                display: "flex",
                                gap: "15px",
                                flexDirection: "column"
                            }}>
                                <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                                    <Typography fontWeight={"bold"} style={{fontSize: "14px"}}>Username:</Typography>
                                    <Typography style={{fontSize: "14px"}}>{user?.username}</Typography>
                                </div>
                                <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                                    <Typography fontWeight={"bold"} style={{fontSize: "14px"}}>Bio:</Typography>
                                    <Typography style={{fontSize: "14px"}}>{user?.bio}</Typography>
                                </div>
                                <div style={{display: "flex", flexDirection: "column", gap: "7px"}}>
                                    <Typography fontWeight={"bold"} style={{fontSize: "14px"}}>General
                                        Interests:</Typography>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "7px",
                                        flexFlow: "row wrap"
                                    }}>
                                        {newInterests.map(i => <div key={i.interestId} style={{
                                            backgroundColor: "#ebebeb",
                                            borderRadius: "50px"
                                        }}>
                                            <Typography marginBottom={"5px"} marginTop={"5px"} marginRight={"10px"}
                                                        marginLeft={"10px"}
                                                        style={{fontSize: "13px"}}>{i.interest} </Typography>
                                        </div>)}
                                    </div>
                                    {error && <Typography
                                        style={{
                                            color: "red",
                                            fontSize: "13px",
                                            marginTop: "20px"
                                        }}>{error}</Typography>}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={2} style={{display: "flex", alignItems: "center"}}>
                            <div>
                                {!isFriend && !isSame &&
                                    <Button style={{width: "150px"}} color="primary" size={"small"} variant="contained"
                                            onClick={() => followFriend()}>follow</Button>
                                }
                                {isFriend && !isSame &&
                                    <Button style={{width: "150px"}} color="primary" size={"small"} variant="contained"
                                            onClick={() => unfollowFriend()}>unfollow</Button>
                                }
                            </div>
                        </Grid>
                    </Grid>
                }
            </div>
            <div style={{height: "1px", backgroundColor: "#e0e0e0"}}></div>
            <div style={{display: "flex", flexDirection: "column", margin: "40px"}}>
                <Typography fontWeight={"bold"} fontSize={"20px"} marginBottom={"30px"}>Previous Trips:</Typography>
                {!previousTripsState ?
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80vw",
                        height: "200px"
                    }}><CircularProgress size={"20px"}></CircularProgress></div>
                    :
                    <div style={{display: "flex", flexDirection: "column", flexFlow: "row wrap", gap: "40px"}}>
                        {previousTrips.map(trip => <PreviousTripBox
                            key={trip.previousTripId} {...trip}></PreviousTripBox>)}
                    </div>
                }
            </div>
        </>
    );
}
