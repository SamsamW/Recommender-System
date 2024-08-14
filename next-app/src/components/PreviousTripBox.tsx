import {KeywordsOfPreviousTrip, PreviousTripWithDestination} from "@/types/trip";
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Rating from '@mui/material/Rating';
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@/types/error";
import * as React from "react";

export const PreviousTripBox = (props: PreviousTripWithDestination) =>{

    const [error, setError] = useState<string|null>(null)
    const [keywords, setKeywords] = useState<KeywordsOfPreviousTrip[]>([])
    const [keywordsState, setKeywordsState] = useState<boolean>(false)
    useEffect(() => {
        const getInitial = async () => {

            const keywords = await fetch(`/api/keywordPreviousTrip/previousTrip/${props.previousTripId}`)
            if (!keywords.ok) {
                if (keywords.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await keywords.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${keywords.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const keysPrevTrip: KeywordsOfPreviousTrip[] = await keywords.json();

            setKeywords(keysPrevTrip)
            setKeywordsState(true)

        }

        getInitial()
    }, []);

    return(
        <>
            {keywordsState &&
            <div style={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", display:"flex", alignItems:"center", justifyContent:"center", width:"70vh", minHeight:"200px"}}>
                <Grid container marginTop={"20px"} marginBottom={"20px"}>
                    <Grid item xs={3} display={"flex"} alignItems={"flex-start"} justifyContent={"center"}>
                        <div style={{backgroundColor: "#e0e0e0", width: "80px", height: "80px", marginTop: "25px"}}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                backgroundImage: `url(${props.destination?.image})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center",
                            }}/>
                        </div>
                    </Grid>
                    <Grid item xs={6} display={"flex"} justifyContent={"center"} flexDirection={"column"} gap={"5px"}>
                        <Typography fontSize={"13px"}
                                    fontWeight={"bold"}>Destination: {props.destination.city}, {props.destination.country}</Typography>
                        <Typography
                            fontSize={"13px"}>Date: {new Date(props.startDate).toDateString()} - {new Date(props.endDate).toDateString()}</Typography>
                        <Typography fontSize={"13px"}>Budget per day: {props.budget} €</Typography>

                        <div style={{display: "flex", flexDirection: "column", gap: "7px"}}>
                             <Typography style={{fontSize: "13px"}}>Keywords: </Typography>
                            <div style={{display: "flex", flexDirection: "column", gap: "7px", flexFlow:"row wrap"}}>
                                {keywords.map(k => <div key={k.keywordPreviousTripId} style={{backgroundColor:"#ebebeb", borderRadius:"50px"}}><Typography marginBottom={"5px"} marginTop={"5px"} marginRight={"10px"} marginLeft={"10px"} style={{fontSize: "13px"}}>{k.keywordPreviousTrip.keyword} </Typography></div>)}
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={3} display={"flex"} alignItems={"flex-start"} justifyContent={"center"}>
                        <Rating style={{marginTop:"50px"}} size={"small"} name="read-only" value={props.rating} readOnly/>
                    </Grid>
                </Grid>
                {error && <Typography style={{color: "red", fontSize: "13px"}}>{error}</Typography>}
            </div>
            }
        </>
    )
}