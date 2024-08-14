'use client'
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import ListAltIcon from '@mui/icons-material/ListAlt';
import {useRouter} from "next/navigation";
import {Notification} from "@/types/notification";


export const ItsYourTurnBox = (props: Notification) =>{

    const router = useRouter()

    const handleClickGoToTrip = () => {
        router.push(`/trip/${props.tripId}`)
    }

    return (
        <div style={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",minHeight:"120px", display:"flex", alignItems:"center", justifyContent:"center", marginRight:"40px", marginLeft:"40px", marginTop:"20px"}}>
            <Grid container marginTop={"20px"} marginBottom={"20px"}>
                <Grid item xs={1.5} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <ListAltIcon style={{height:"60px", width:"60px"}}></ListAltIcon>
                </Grid>
                <Grid item xs={7} display={"flex"} justifyContent={"center"} flexDirection={"column"} gap={"5px"}>
                    <Typography fontSize={"16px"} fontWeight={"bold"}>It is your turn!</Typography>
                    <div style={{display:"flex", gap:"5px", flexDirection:"column"}}>
                        <Typography fontSize={"14px"}> The next stage of planning of your trip is here! </Typography>
                        <Typography fontSize={"14px"}> Date:  {new Date(props.trip.startDate).toDateString()} - {new Date(props.trip.endDate).toDateString()} </Typography>
                    </div>
                </Grid>
                <Grid item xs={3.5} display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"20px"}>
                    <Button style={{width: "170px"}} color={"primary"} variant="contained" onClick={() => handleClickGoToTrip()}>Go to trip page</Button>
                </Grid>
            </Grid>
        </div>
    )
}