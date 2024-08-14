'use client'
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import * as React from "react";
import {useRouter} from "next/navigation";
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@/types/error";
import {Activity} from "@/types/activity"
import Link from "next/link";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MuseumIcon from "@mui/icons-material/Museum";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SpaIcon from "@mui/icons-material/Spa";
import TramIcon from "@mui/icons-material/Tram";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ChurchIcon from "@mui/icons-material/Church";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LandscapeIcon from "@mui/icons-material/Landscape";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WavesIcon from "@mui/icons-material/Waves";
import styles from "./activity.module.css"


export default function Page({params}: { params: { activityId: string } }) {

    const [activity, setActivity] = useState<Activity | null>(null)
    const [activitiesState, setActivitiesState] = useState<boolean>(false)
    const [addressString, setAddressString] = useState<string>("")
    const [descriptionString, setDescriptionString] = useState<string>("")
    const [openingHoursString, setOpeningHoursString] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const router = useRouter();


    useEffect(() => {
        const getInitial = async () => {

            const activityRes = await fetch(`/api/activity/${Number(params.activityId)}`)

            if (!activityRes.ok) {
                if (activityRes.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await activityRes.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${activityRes.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const activitiesQueried: Activity = await activityRes.json();

            if (activitiesQueried === null) {
                router.push("/noActivityFound")
                return
            }
            setActivity(activitiesQueried);

            if(activitiesQueried.address !== null) {

                if (activitiesQueried.address.includes("countryname") || activitiesQueried.address.includes("zipcode")) {

                    let addressArray = [activitiesQueried.address]

                    if(activitiesQueried.address.includes("\"")){
                        addressArray = activitiesQueried.address.split("\"")
                    }

                    if(activitiesQueried.address.includes("\'")){
                        addressArray = activitiesQueried.address.split("\'")
                    }


                    const resArray = []

                    for (let i = 0; i < addressArray.length; i++) {
                        if (addressArray[i] === "" || addressArray[i] === ":" || addressArray[i] === "," || addressArray[i].includes(":") || addressArray[i].includes("{") || addressArray[i].includes("}") || addressArray[i].includes("?") || addressArray[i].includes("/") || addressArray[i].includes("\\") || addressArray[i].includes("&") || addressArray[i].includes(",") || addressArray[i] === "street" || addressArray[i] === "countryname"
                            || addressArray[i] === "town" || addressArray[i] === "zipcode") {
                            continue
                        } else {
                            resArray.push(addressArray[i]);
                        }
                    }


                    let resString = ""

                    for(let i = 0; i < resArray.length; i++){
                        if(i === 0){
                            resString = resString.concat(resArray[i])
                        }
                        else{
                            resString = resString.concat(", ").concat(resArray[i])
                        }

                    }

                    setAddressString(resString);
                } else {
                    setAddressString(activitiesQueried.address);
                }
            }

            if(activitiesQueried.description !== null) {
                const description = activitiesQueried.description.replaceAll("<br/>", " ")
                setDescriptionString(description)
            }
            if(activitiesQueried.openingHours !== null) {
                const openingHours = activitiesQueried.openingHours.replaceAll("<br/>", " ")
                setOpeningHoursString(openingHours)
            }

            setActivitiesState(true)
        }
        getInitial()
    }, []);


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
        <div style={{margin: "20px", display: "flex", flexDirection: "column", gap: "50px"}}>
            {!activitiesState ?
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{width: "400px", height: "400px", marginTop:"30px", marginLeft:"55px"}}>
                        <div style={{width: '300px', height: '250px'}} className={styles.skeleton} />
                    </div>

                </div>
                :
                <>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div style={{width: "400px", height: "400px", display:"flex", justifyContent:"center"}}>
                                <div style={{
                                    width: '300px',
                                    height: '250px',
                                    backgroundColor: "white",
                                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop:"30px",
                                    marginLeft:"20px"
                                }}>
                                    {activity !== null && activity.category !== null && getIcon(activity.category.toLowerCase())}
                                </div>
                        </div>

                        <div style={{marginRight:"50px", marginLeft:"50px", marginTop: "40px", marginBottom:"50px", display: "flex", flexDirection: "column", gap: "20px"}}>

                            <Typography fontWeight={"bold"} fontSize={"14px"}> {activity?.title} </Typography>

                            {activity?.description !== null && activity?.description !== "" &&
                                    <Typography fontSize={"14px"} fontStyle='italic'>{descriptionString}</Typography>
                            }

                            {activity?.address !== null && activity?.address !== "" &&
                                <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                                <Typography fontWeight={"bold"} fontSize={"14px"}> Address: </Typography>
                                <Typography fontSize={"14px"}>{addressString} </Typography>
                                </div>}

                            {activity?.price !== null && activity?.price !== "" &&
                                <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                                    <Typography fontWeight={"bold"} fontSize={"14px"}> Price per person: </Typography>
                                    <Typography fontSize={"14px"}>{activity?.price}€ </Typography>
                                </div>}


                            {activity?.duration !== null && activity?.duration !== undefined && activity?.duration !== 0 &&
                                <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                                    <Typography fontWeight={"bold"} fontSize={"14px"}> Duration: </Typography>
                                    <Typography fontSize={"14px"}>{activity?.duration < 10 ? activity?.duration + "h" : activity?.duration + "min" } </Typography>
                                </div>}

                            {activity?.openingHours !== null && activity?.openingHours !== "" &&
                                <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                                    <Typography fontWeight={"bold"} fontSize={"14px"}> Opening hours: </Typography>
                                    <Typography fontSize={"14px"}>{openingHoursString} </Typography>
                                </div>
                            }


                            {activity?.reachablePublicTransport !== null &&
                                <Typography fontSize={"14px"}> Reachable with public
                                    transport: {activity?.reachablePublicTransport ? "yes" : "no"}</Typography>}

                            {activity?.website !== null && activity?.website !== undefined &&
                                <Typography fontSize={"14px"}> More Information can be found <Link
                                    style={{textDecoration: 'underline'}} href={activity?.website}> here </Link>
                                </Typography>}


                            {error !== null &&
                                <Typography style={{color: "red", fontSize: "13px"}}>{error}</Typography>}
                        </div>
                    </div>

                    <div>

                    </div>

                </>
            }
        </div>
    )
}