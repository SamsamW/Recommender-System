'use client'
import React from 'react';
import {Typography} from "@mui/material";
import {MatchQuestionaire} from "@prisma/client";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";


export const WaitingForAMatchBox = (props: MatchQuestionaire) => {

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                width: "340px",
                minHeight: "190px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
                zIndex: 5
            }}>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "30px",
                    flexDirection: "column",
                    gap: "10px"
                }}>
                    <Typography fontWeight={"bold"}
                                fontSize={"13px"}>Date: {new Date(props.startDate).toDateString()} - {new Date(props.endDate).toDateString()}</Typography>
                </div>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    flexFlow: 'row wrap',
                    marginLeft: "20px",
                    marginRight: "20px"
                }}>
                    <Typography fontSize={"13px"}>Still waiting for companions</Typography>
                </div>
                <Diversity3Icon style={{height: "40px", width: "40px", marginTop: "10px"}}></Diversity3Icon>
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
                zIndex: 4,
                position: "absolute",
                width: "340px",
                minHeight: "190px"
            }}>
                <HourglassEmptyIcon style={{width: "180px", height: "180px", color: "#f4f4f4"}}/>
            </div>
        </div>
    );
};

export default WaitingForAMatchBox;
