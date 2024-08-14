'use client'
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";
import {Trip} from "@prisma/client";
import {getUserIdFromCookie} from "@/utils/client/authHelper";
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@/types/error";
import {Friend} from "@/types/user";

export default function Page ()  {
    const [name, setName] = useState("");
    const [addedUsers, setAddedUsers] = useState<number[]>([]);
    const [created, setCreated] = useState<boolean>(false)
    const [error, setError] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [followedUsers, setFollowedUsers ] = useState<Friend[]>([]);
    const [trip, setTrip] = useState<Trip|null>(null);
    const router = useRouter()


    useEffect(() => {
        const getInitial = async () => {
            const id = getUserIdFromCookie();
            if (id === null) {
                router.push("/login")
                return
            }

            const userRes = await fetch(`/api/user/friends`)

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

            const users = await userRes.json()

            setFollowedUsers(users)
        }
        getInitial()
    }, []);


    const handleClickCreate = async () => {
        setError("");
        if (name === "") {
            setError("Name is required!");
            return
        }

        if (startDate === null) {
            setError("Start date is required!");
            return
        }

        if (endDate === null) {
            setError("End date is required!");
            return
        }

        if (startDate <= new Date()) {
            setError("Start date has to be after now!");
            return;
        }

        if (endDate <= startDate) {
            setError("Start date has to be before the end date!");
            return;
        }

        const response = await fetch('/api/trip',
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: name,
                        startDate: startDate,
                        endDate: endDate,
                        users: addedUsers
                }),
            }
    )


        if (!response.ok) {
            if (response.status === StatusCodes.BAD_REQUEST) {
                setError("Something went wrong. Please try again later");
            }
            if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                setError("Something went wrong. Please try again later");
            }
            return;
        }

        const trip = await response.json()

        setTrip(trip)
        setCreated(true);
    }

    const handleClickContinue = () => {
        router.push("/groupInterests/" + trip?.tripId)
    }

    return (
        <div style={{margin: "50px", display: "flex", gap: "70px", flexDirection: "column"}}>
            <div style={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "center"}}>
                <Typography fontWeight={"bold"} fontSize={"14px"}>Select a name for your group trip:</Typography>
                <TextField inputProps={{style: {fontSize: 14}}} style={{width: "350px"}} color="primary"
                           name="grouptrip name" variant="outlined" size="small"
                           InputLabelProps={{shrink: false}}
                           onChange={(e => {
                               setName(e.target.value)
                           })}/>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap:"90px"}}>
            <div style={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "center"}}>
                <Typography fontWeight={"bold"} fontSize={"14px"}>Select start date:</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="" slotProps={{textField: {size: 'small'}}} onAccept={(date) => {
                            if (date !== null) {
                                setStartDate(date.toDate());
                            }}}/>
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "center"}}>
                <Typography fontWeight={"bold"} fontSize={"14px"}>Select end date:</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="" slotProps={{textField: {size: 'small'}}}
                                    onAccept={(date) => {
                                        if (date !== null) {
                                            setEndDate(date.toDate());
                                        }}}/>
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            </div>

            <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <div style={{display:"flex", flexDirection: "row", gap:"5px"}}>
                <Typography fontWeight={"bold"} fontSize={"14px"}>Add users: </Typography>
                <Typography fontSize={"14px"}> (you have to be befriended)</Typography>
                </div>
                <Autocomplete
                    multiple
                    style={{width: "400px"}}
                    id="tags-standard"
                    popupIcon={false}
                    options={followedUsers}
                    getOptionLabel={(option) => option.friendOfUser.username}
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
                        setAddedUsers(value.map(u => u.friendOfUserId))
                    })}
                />
            </div>
            <div>
                {error !== "" && <Typography style={{color: "red", fontSize: "13px"}}>{error}</Typography>}
                {!created &&<Button style={{marginTop:"20px", width: "200px"}} color={"primary"} variant="contained" onClick={() => handleClickCreate()}>Create trip</Button>}
                {created && <Typography style={{color: "black", fontSize: "13px"}}> trip was created successfully!</Typography>}
                {created &&<Button style={{marginTop:"20px", width: "200px"}} color={"primary"} variant="contained" onClick={() => handleClickContinue()}>Continue to interests</Button>}

            </div>
        </div>
    )
}
