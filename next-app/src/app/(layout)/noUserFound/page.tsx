import * as React from 'react';
import {Typography} from "@mui/material";


export default function Page() {

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
            <Typography fontWeight={"bold"} style={{marginTop:"200px", fontSize:"25px"}}>Sorry, user not found :(
            </Typography>
        </div>
    );
}
