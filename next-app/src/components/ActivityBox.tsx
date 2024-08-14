'use client'
import {Typography, Button} from "@mui/material";
import * as React from "react";
import {Activities} from "@/types/trip"
import MuseumIcon from '@mui/icons-material/Museum';
import {useRouter} from "next/navigation";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SpaIcon from '@mui/icons-material/Spa';
import TramIcon from '@mui/icons-material/Tram';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ChurchIcon from '@mui/icons-material/Church';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import LandscapeIcon from '@mui/icons-material/Landscape';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WavesIcon from '@mui/icons-material/Waves';

export const ActivityBox = (props: Activities) =>{

    const router = useRouter()

    const handleClick = () => {
        router.push("/activity/" + props.activityId)
    }

    const icons =
        {
            viewpoint: <RemoveRedEyeIcon style={{color:"black", width:"80px", height:"80px"}}></RemoveRedEyeIcon>,
            museum: <MuseumIcon style={{color:"black", width:"80px", height:"80px"}}></MuseumIcon>,
            "city tour": <LocationCityIcon style={{color:"black", width:"80px", height:"80px"}}></LocationCityIcon>,
            restaurant: <RestaurantIcon style={{color:"black", width:"80px", height:"80px"}}></RestaurantIcon>,
            cafe: <LocalCafeIcon style={{color:"black", width:"80px", height:"80px"}}></LocalCafeIcon>,
            "leisure activity": <SentimentSatisfiedAltIcon style={{color:"black", width:"80px", height:"80px"}}></SentimentSatisfiedAltIcon>,
            wellness: <SpaIcon style={{color:"black", width:"80px", height:"80px"}}></SpaIcon>,
            "cable car": <TramIcon style={{color:"black", width:"80px", height:"80px"}}></TramIcon>,
            "building and monument": <AccountBalanceIcon style={{color:"black", width:"80px", height:"80px"}}></AccountBalanceIcon>,
            "religious building": <ChurchIcon style={{color:"black", width:"80px", height:"80px"}}></ChurchIcon>,
            waterfall: <WaterfallChartIcon style={{color:"black", width:"80px", height:"80px"}}></WaterfallChartIcon>,
            "coast and beach": <BeachAccessIcon style={{color:"black", width:"80px", height:"80px"}}></BeachAccessIcon>,
            gorge: <LandscapeIcon style={{color:"black", width:"80px", height:"80px"}}></LandscapeIcon>,
            glacier: <AcUnitIcon style={{color:"black", width:"80px", height:"80px"}}></AcUnitIcon>,
            lake: <WavesIcon style={{color:"black", width:"80px", height:"80px"}}></WavesIcon>,
            cave: <LandscapeIcon style={{color:"black", width:"80px", height:"80px"}}></LandscapeIcon>,
            wasserfall: <WaterfallChartIcon style={{color:"black", width:"80px", height:"80px"}}></WaterfallChartIcon>,
            see: <WavesIcon style={{color:"black", width:"80px", height:"80px"}}></WavesIcon>,
            schlucht: <LandscapeIcon style={{color:"black", width:"80px", height:"80px"}}></LandscapeIcon>,
            höhle: <LandscapeIcon style={{color:"black", width:"80px", height:"80px"}}></LandscapeIcon>,
            aussichtspunkt: <RemoveRedEyeIcon style={{color:"black", width:"80px", height:"80px"}}></RemoveRedEyeIcon>,
        }




    const getIcon = (category: string) : React.JSX.Element => {
        // @ts-ignore
        return icons[category];
    }

    return (
        <>
            <Button onClick={() => handleClick()}>
                <div style={{minHeight: "200px", width:"250px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
                    <div style={{width: "250px", height: "150px", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems:"center"}}>

                        {props.activity !== null && props.activity.category !== null && getIcon(props.activity.category.toLowerCase())}
                    </div>
                    <Typography margin={"10px"} fontSize={"14px"}> {props.activity.title} </Typography>
                </div>
            </Button>
        </>
    )
}

