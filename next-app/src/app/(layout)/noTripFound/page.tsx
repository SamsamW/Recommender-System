import {Typography} from "@mui/material";
import * as React from "react";

export default function Page ()  {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography fontWeight={"bold"} style={{marginTop: "200px", fontSize: "25px"}}>Sorry, trip not found :(
            </Typography>
        </div>
    )
}