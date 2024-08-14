'use client'
import {Typography, Button, Divider} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {User} from "@/types/user";
import {getUserIdFromCookie} from "@/utils/client/authHelper";
import {useRouter} from "next/navigation";
import {Interests, InterestsMapped} from "@/types/user"
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@/types/error";
import * as React from "react";
import {PreviousTripWithDestination} from "@/types/trip";
import {AddNewPreviousTrip} from "@/components/AddNewPreviousTrip";
import {PreviousTripBox} from "@/components/PreviousTripBox";
import styles from "./profile.module.css"

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [bio, setBio] = useState<string>("")
    const [error, setError] = useState<string>("");
    const [saved, setSaved] = useState<string>("");
    const [interests, setInterests] = useState<InterestsMapped[]>([]);
    const [allInterests, setAllInterests] = useState<InterestsMapped[]>([])
    const [newInterests, setNewInterests] = useState<InterestsMapped[]>([])
    const [previousTrips, setPreviousTrips] = useState<PreviousTripWithDestination[]>([])
    const [previousTripState, setPreviousTripsState] = useState<boolean>(false)
    const [interestsState, setInterestsState] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        const getInitial = async () => {

            const id = getUserIdFromCookie();
            if (id === null) {
                router.push("/login")
            }

            const userRes = await fetch(`/api/user/${id}`)

            const user: User = await userRes.json();

            setUser(user)
            setUsername(user.username)
            setEmail(user.email)
            setBio(user.bio)

            const allInterests = await fetch(`/api/interests`)

            if (!allInterests.ok) {
                if (allInterests.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await allInterests.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${allInterests.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const allInterestsMapped: InterestsMapped[] = await allInterests.json()
            const allInterestsMappedEnd: InterestsMapped[] = allInterestsMapped.map(e => ({
                interestId: e.interestId,
                interest: e.interest
            }))

            setAllInterests(allInterestsMappedEnd)

            const interestsRes = await fetch(`/api/user/interests/${id}`)
            if (!interestsRes.ok) {
                if (interestsRes.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await interestsRes.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${interestsRes.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const interests: Interests[] = await interestsRes.json();
            const interstsMapped: InterestsMapped[] = interests.map(e => ({
                interestId: e.interest.interestId,
                interest: e.interest.interest
            }));

            setInterests(interstsMapped)
            setNewInterests(interstsMapped)

            setInterestsState(true)

            const prevTripRes = await fetch(`/api/previousTrip/user/${id}`)
            if (!prevTripRes.ok) {
                if (prevTripRes.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await prevTripRes.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${prevTripRes.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const prevTrip: PreviousTripWithDestination[] = await prevTripRes.json();

            setPreviousTrips(prevTrip.sort((a, b) => new Date(b.startDate).getFullYear() - new Date(a.startDate).getFullYear() || new Date(b.startDate).getMonth() - new Date(a.startDate).getMonth() || new Date(b.startDate).getDate() - new Date(a.startDate).getDate()))
            setPreviousTripsState(true)

        }
        getInitial()
    }, []);


    const handleClickSave = async () => {
        setSaved("")
        setError("")
        let usernameChanged = false

        if (username === "") {
            setError("Please enter a valid username");
            return
        }
        if (email === "") {
            setError("Please enter a valid email");
            return
        }

        if (username !== user?.username) {
            const response = await fetch(`/api/user/update/username/${username}`, {method: "POST"});
            if (!response.ok) {
                if (response.status === StatusCodes.BAD_REQUEST) {
                    setError("Username already exists");
                }
                if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                    setError("Something went wrong. Please try again later");
                }
                return;
            }
            setUser(prev => (prev ? {...prev, "username": username} : null))
            usernameChanged = true
        }

        if (email !== user?.email) {
            const response = await fetch(`/api/user/update/email/${email}`, {method: "POST"});
            if (!response.ok) {
                if (response.status === StatusCodes.BAD_REQUEST) {
                    setError("Email already exists");
                }
                if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                    setError("Something went wrong. Please try again later");
                }
                return;
            }
        }

        if (bio !== user?.bio) {
            const response = await fetch(`/api/user/update/bio/${bio}`, {method: "POST"});
            if (!response.ok) {
                if (response.status === StatusCodes.BAD_REQUEST) {
                    setError("Something went wrong");
                }
                if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                    setError("Something went wrong. Please try again later");
                }
                return;
            }
        }

        const newInterestsSorted = newInterests.map(e => e.interestId).sort((a, b) => a - b)
        const interestsSorted = interests.map(e => e.interestId).sort((a, b) => a - b)


        if (newInterestsSorted.toString() !== interestsSorted.toString()) {
            const response = await fetch('/api/user/update/interests',
                {
                    method: "POST",
                    body: JSON.stringify({
                        interest: newInterestsSorted,
                    }),
                })
            if (!response.ok) {
                setError("Something went wrong. Please try again later");
                return;
            }
        }

        if (usernameChanged) {
            window.location.reload()
        }
        setSaved("Changes were saved successfully!")
    }

    const handleClickChangePhoto = () => {
        //todo implement change photo logic
    }

    const handleClickLogout = async () => {

        const response = await fetch('/api/logout', {method: "DELETE"})
        if (!response.ok) {
            if (response.status === StatusCodes.BAD_REQUEST) {
                setError("Logout went wrong");
            }
            if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                setError("Logout went wrong. Please try again later");
            }
            return;
        }

        router.push("/login")
    }


    return (
        <div style={{display: "flex", flexDirection: "row", gap: "90px"}}>
            <div style={{display: "flex", flexDirection: "column", gap: "30px", marginLeft: "90px"}}>
                <Typography marginTop={"30px"} fontWeight={"bold"} fontSize={"20px"}>Edit Profile</Typography>
                {!interestsState ?
                    <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                            <div className={styles.skeleton}
                                 style={{width: "45px", height: "45px", borderRadius: "100%"}}></div>
                            <div className={styles.skeleton} style={{width: "290px", height: "45px"}}></div>
                        </div>
                        <div className={styles.skeleton}
                             style={{width: "350px", height: "45px", marginTop: "10px"}}></div>
                        <div className={styles.skeleton} style={{width: "350px", height: "45px"}}></div>
                        <div className={styles.skeleton} style={{width: "350px", height: "45px"}}></div>
                        <div className={styles.skeleton} style={{width: "350px", height: "150px"}}></div>
                    </div>
                    :
                    <>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                            <Avatar src="/broken-image.jpg"
                                    style={{
                                        color: "#ffffff",
                                        backgroundColor: "#000000",
                                        width: "45px",
                                        height: "45px"
                                    }}/>
                            <div>
                                <Typography marginLeft="10px" fontSize={"12px"}>{user?.username}</Typography>
                                <Button onClick={() => handleClickChangePhoto()} variant="text"
                                        style={{fontSize: "x-small", color: "gray"}}>Change profile photo</Button>
                            </div>

                        </div>
                        <div style={{display: "flex", gap: "20px", flexDirection: "column"}}>
                            <div>
                                <Typography fontSize={"12px"}>Username</Typography>
                                <TextField inputProps={{style: {fontSize: 12}}} style={{width: "350px"}} color="primary"
                                           name="username" variant="outlined" size="small" value={username || ""}
                                           InputLabelProps={{shrink: false}}
                                           onChange={(e => {
                                               setUsername(e.target.value)
                                           })}/>
                            </div>
                            <div>
                                <Typography fontSize={"12px"}>Email</Typography>
                                <TextField inputProps={{style: {fontSize: 12}}} style={{width: "350px"}} color="primary"
                                           name="email" variant="outlined" size="small" value={email || ""}
                                           InputLabelProps={{shrink: false}}
                                           onChange={(e => {
                                               setEmail(e.target.value)
                                           })}/>
                            </div>
                            <div>
                                <Typography fontSize={"12px"}>Bio</Typography>
                                <TextField inputProps={{style: {fontSize: 12}}} style={{width: "350px"}} color="primary"
                                           name="username" variant="outlined" size="small" value={bio || ""}
                                           InputLabelProps={{shrink: false}}
                                           onChange={(e => {
                                               setBio(e.target.value)
                                           })}/>
                            </div>
                            <div>
                                <Typography fontSize={"12px"}>General Interests</Typography>
                                <Autocomplete
                                    multiple
                                    style={{width: "350px"}}
                                    id="tags-standard"
                                    popupIcon={false}
                                    options={allInterests}
                                    getOptionLabel={(option) => option.interest}
                                    value={newInterests.map(e => {
                                        return allInterests.findIndex(el => el.interest === e.interest)
                                    }).map(e => allInterests[e])}
                                    defaultValue={[]}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label=""
                                            InputLabelProps={{shrink: false}}
                                        />
                                    )}
                                    onChange={((e, value) => {
                                        setNewInterests(value)
                                    })}
                                />
                            </div>

                        </div>
                        {error !== "" && <Typography style={{color: "red", fontSize: "13px"}}>{error}</Typography>}
                        {saved !== "" && <Typography style={{color: "green", fontSize: "13px"}}>{saved}</Typography>}
                        <div style={{display: "flex", flexDirection: "row", gap: "40px"}}>
                            <Button style={{fontSize: "12px", width: "150px"}} color={"primary"} variant="contained"
                                    onClick={() => handleClickSave()}>Save changes</Button>
                            <Button style={{fontSize: "12px", width: "80px"}} color={"primary"} variant="outlined"
                                    onClick={() => handleClickLogout()}>Logout</Button>
                        </div>
                    </>
                }

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "30px", paddingBottom: "30px"}}>
                <Divider orientation={"vertical"} style={{minHeight: "87vh"}}/>
                <div style={{display: "flex", flexDirection: "column", gap: "30px", marginLeft: "60px"}}>
                    <div style={{display: "flex", flexDirection: "column", gap: "30px"}}>
                        <Typography marginTop={"30px"} fontWeight={"bold"} fontSize={"20px"}>Previous Trips</Typography>
                        <AddNewPreviousTrip></AddNewPreviousTrip>
                    </div>
                    {!previousTripState ?
                        <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                            <div className={styles.skeleton}
                                 style={{width: "530px", height: "200px", marginTop: "10px"}}></div>
                            <div className={styles.skeleton} style={{width: "530px", height: "200px"}}></div>
                        </div>
                        :
                        <div style={{display: "flex", flexDirection: "column", gap: "30px"}}>
                            {previousTrips.map(trip => <PreviousTripBox
                                key={trip.previousTripId} {...trip}></PreviousTripBox>)}
                        </div>
                    }
                </div>
            </div>


        </div>
    )
}
