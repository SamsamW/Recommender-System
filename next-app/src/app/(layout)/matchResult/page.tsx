'use client'
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Page ()  {

    const router = useRouter()



    const handleClickContinue = () => {
        router.push("/yourTrips")
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"50px", marginTop:"50px", marginBottom:"10px", marginLeft:"80px", marginRight:"80px"}}>
            <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
                <Typography fontWeight={"bold"} fontSize={"28px"}>You completed your application as travel companion for your next trip!</Typography>
                <div style={{display: "flex", flexDirection:"column", gap:"10px", marginTop:"30px", alignItems:"center", justifyContent:"center"}}>
                    <Typography fontSize={"15px"}>We are currently looking for a match for you</Typography>
                    <Typography fontSize={"15px"}>You will get a notification when your result is ready :) </Typography>
                </div>
            </div>
            <Box sx={{ display: 'flex', margin:"50px" }}>
                <CircularProgress />
            </Box>

            <Button style={{ marginTop:"20px", width: "200px"}} color={"primary"} variant="contained" onClick={() => handleClickContinue()}>Go to your trips</Button>

        </div>
    )
}