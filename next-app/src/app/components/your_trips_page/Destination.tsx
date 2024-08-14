import React from 'react';
import {Typography} from "@mui/material";

interface DestinationProps {
  destination: string;
}

const Destination: React.FC<DestinationProps> = ({destination}) => {
  
  return (
    <div style={{ display:"flex", alignItems:"center"}}>
        <Typography fontWeight={"bold"} fontSize={"13px"}>{destination}</Typography>
    </div>
  )
};

export default Destination;
