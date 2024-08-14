'use client'
import React from 'react';
import Image from './Image';
import {Typography, Button} from "@mui/material";
import {useRouter} from "next/navigation";
import {UserOnTrip} from "@/types/trip";

export const Finished_planning_box = (props: UserOnTrip) => {
    const router = useRouter();

    const handleClickBox = () => {
        router.push("/trip/"+props.tripId)
    }

    return (
      <Button onClick={() => handleClickBox()}>
          <div style={{margin: "5px", width: "340px", minHeight: "190px", marginTop: "20px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", gap:"2px"}}>
              <div style={{
                  width: '340px',
                  height: '190px',
                  backgroundImage: `url(${props.trip.destination?.image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
              }}/>

              <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: "10px",
                  marginBottom: "10px",
                  flexDirection: "column",
                  gap: "10px",
                  margin:"10px"
              }}>
                  <Typography fontWeight={"bold"}
                              fontSize={"13px"}>Destination: {props.trip.destination?.city}, {props.trip.destination?.country}</Typography>
                  <Typography fontWeight={"bold"}
                              fontSize={"13px"}>Date: {new Date(props.trip.startDate).toDateString()} - {new Date(props.trip.endDate).toDateString()}</Typography>
              </div>

          </div>
      </Button>
    );
};

export default Finished_planning_box;
