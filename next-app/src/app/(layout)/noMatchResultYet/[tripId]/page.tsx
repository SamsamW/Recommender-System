'use client'
import {Typography, Button} from "@mui/material";
import {useRouter} from "next/navigation";

export default function Page ()  {

    const router = useRouter()

    const handleClickToYourTrips = () => {
        router.push("/yourTrips")
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "90px", gap: "50px", marginRight:"80px", marginLeft:"80px"}}>
            <Typography fontWeight={"bold"} fontSize={"30px"}>Sorry we don’t have any results yet</Typography>
            <Typography fontSize={"15px"}>You will be notified when we find a match</Typography>
            <Button style={{marginLeft: "900px", marginTop: "90px", width: "200px"}} color={"primary"}
                    variant="contained" onClick={() => handleClickToYourTrips()}>Your Trips overview</Button>
        </div>
    )
}