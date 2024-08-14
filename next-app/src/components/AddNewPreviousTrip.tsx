import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import {DestinationMapped} from "@/types/trip";
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@/types/error";
import {Typography} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Rating from '@mui/material/Rating';
import Slider from "@mui/material/Slider";
import {KeywordPreviousTrip} from "@prisma/client";


const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export const AddNewPreviousTrip = () => {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState<string | null>(null);

    const [allDestinations, setAllDestinations] = useState<DestinationMapped[]>([])
    const [destination, setDestination] = useState<DestinationMapped | null>(null)

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [rating, setRating] = React.useState<number | null>(0);
    const [tripBudget, setTripBudget] = useState<number>(0)

    const [allKeywords, setAllKeywords] = useState<KeywordPreviousTrip[]>([])
    const [newKeywords, setNewKeywords] = useState<KeywordPreviousTrip[]>([])


    useEffect(() => {
        const getInitial = async () => {
            const allDests = await fetch(`/api/destinations`)

            if (!allDests.ok) {
                if (allDests.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await allDests.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${allDests.status}):Something went wrong. Please try again later.`);
                    return;
                }
            }

            const allDestinationsMapped: DestinationMapped[] = await allDests.json()

            setAllDestinations(allDestinationsMapped)

            const allKeys = await fetch(`/api/keywordPreviousTrip`)

            if (!allKeys.ok) {
                if (allKeys.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await allKeys.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${allKeys.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const allKeysMapped: [] = await allKeys.json()

            setAllKeywords(allKeysMapped)
        }
        getInitial()
    }, []);


    const handleClickSave = async () => {

        if (startDate === null) {
            setError("Start date is required!");
            return
        }

        if (endDate === null) {
            setError("End date is required!");
            return
        }

        if (destination === null){
            setError("Destination is required!");
            return
        }

        if (startDate > new Date()) {
            setError("Start date has to be before now!");
            return;
        }

        if (endDate <= startDate) {
            setError("Start date has to be before the end date!");
            return;
        }

        const response = await fetch('/api/previousTrip',
            {
                method: "POST",
                body: JSON.stringify({
                    destinationId: destination.destinationId,
                    startDate: startDate,
                    endDate: endDate,
                    budget: tripBudget,
                    rating: rating,
                    keywords: newKeywords.map(e => e.keywordPreviousTripId)
                }),
            }
        )
        if (!response.ok) {
            if (response.status === StatusCodes.BAD_REQUEST) {
                setError("Username or Email already exists");
            }
            if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                setError("Something went wrong. Please try again later");
            }
            return;
        }
        setError(null);
        window.location.reload()

    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return <>
        <div style={{display: "flex"}}>
            <Button color="primary" style={{fontSize: "12px"}} variant="contained" onClick={handleClickOpen}>
                Add previous trip
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">

                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <div style={{
                    display: "flex",
                    gap: "30px",
                    marginRight: "40px",
                    marginLeft: "40px",
                    marginBottom: "40px",
                    marginTop: "10px",
                    flexDirection: "column",
                    width: "400px",
                    minHeight: "400px"
                }}>
                    <Typography fontWeight={"bold"} fontSize={"20px"}>Add previous trip</Typography>

                    <div style={{display: "flex", gap: "5px", flexDirection: "column"}}>
                        <Typography fontSize={"13px"}>Destination:</Typography>
                        <Autocomplete
                            style={{width: "350px"}}
                            id="tags-standard"
                            popupIcon={false}
                            options={allDestinations}
                            getOptionLabel={(option) => option.city.concat(", ").concat(option.country)}
                            value={destination}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label=""
                                    InputLabelProps={{shrink: false}}
                                    size={"small"}
                                />
                            )}
                            onChange={((e, value) => {
                                setDestination(value)
                            })}
                        />
                    </div>

                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <Typography fontSize={"13px"}>Start date:</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="" slotProps={{textField: {size: 'small'}}} onAccept={(date) => {
                                        if (date !== null) {
                                            setStartDate(date.toDate());
                                        }
                                    }}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <Typography fontSize={"13px"}>End date:</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="" slotProps={{textField: {size: 'small'}}} onAccept={(date) => {
                                        if (date !== null) {
                                            setEndDate(date.toDate());
                                        }
                                    }}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Typography fontSize={"13px"}>Budget per day:</Typography>
                        <Slider
                            sx={{width: "300px", marginLeft: "10px"}} defaultValue={0} aria-label="Default"
                            valueLabelDisplay="auto" min={0}
                            max={500} marks={[{value: 0, label: '0€',}, {value: 500, label: '500€',},]}
                            onChange={(e, value) => setTripBudget(value as number)}
                        />
                    </div>

                    <div style={{display: "flex", flexDirection: "column", gap:"7px"}}>
                        <Typography fontSize={"13px"}>Activities/Keywords:</Typography>
                        <Autocomplete
                            multiple
                            style={{width: "350px"}}
                            id="tags-standard"
                            popupIcon={false}
                            options={allKeywords}
                            getOptionLabel={(option) => option.keyword}
                            value={newKeywords.map(e => {
                                return allKeywords.findIndex(el => el.keywordPreviousTripId === e.keywordPreviousTripId)
                            }).map(e => allKeywords[e])}
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
                                setNewKeywords(value)
                            })}
                        />
                    </div>

                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Typography fontSize={"13px"}>Rating:</Typography>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                if(newValue !== null) {
                                    setRating(newValue);
                                }
                            }}
                        />
                    </div>
                    {error !== null && <Typography style={{color: "red", fontSize: "13px"}}>{error}</Typography>}
                    <Button style={{fontSize: "12px", width: "150px", marginBottom:"30px"}} color={"primary"} variant="contained"
                            onClick={() => handleClickSave()}>Save changes</Button>

                </div>
                <DialogActions>
                </DialogActions>
            </BootstrapDialog>
        </div>
    </>
}
