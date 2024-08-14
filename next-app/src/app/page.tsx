'use client'
import {Typography} from "@mui/material";
import Image from "next/image";
import homeImage from "@/app/(layout)/home/homepage_photo.png";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useEffect} from "react";

export default function Page ()  {

    const router = useRouter();

    useEffect( () => {

        const init = async () => {

             const response = fetch('/api/setup', {method: "POST"})

        }

        init()

    }, []);

    const handleClickLogin = () => {
        router.push("/login");
    }
    const handleClickRegister = () => {
        router.push("/register");
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px", gap: "10px", marginBottom:"50px"}}>
            <div style={{display: "flex", flexDirection: "row", height:"30px", width: "100%", justifyContent:"space-between", alignItems:"center"}}>
                <Typography fontWeight={"bold"} marginLeft={"20px"} fontSize={"13px"}>Travel Rec-system</Typography>
                <div style={{display: "flex", flexDirection: "row", gap:"20px", marginRight:"20px"}}>
                    <Button style={{fontSize:"12px", height:"40px", width:"100px"}} size={"small"} color={"primary"} variant="outlined" onClick={() => handleClickRegister()}>Register</Button>
                    <Button style={{fontSize:"12px", height:"40px", width:"100px"}} size={"small"} color={"primary"} variant="contained" onClick={() => handleClickLogin()}>Login</Button>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography fontWeight={"bold"} fontSize={"30px"}>Explore the World, Your Way!</Typography>
                <Typography fontSize={"20px"}>Create your Dream Trip & Team Up for More Fun</Typography>
            </div>

            <div style={{position: "relative"}}>
                <div style={{ width:"100%", left:"0", display:"flex", justifyContent:"center", position: "relative", zIndex: 1, marginBottom: "1em", marginTop: "2em", opacity: "0.5"
                }}>
                    <Image
                        src={homeImage}
                        alt="Picture home"
                        placeholder="blur"
                    >
                    </Image>
                </div>
                <div className="gold-box" style={{
                    position: "absolute", zIndex: 2, width: "400px", height: "280px", left: "292px", gap: "20px",
                    top: "7em", display: "flex", marginTop:"30px",  alignItems: "center", flexDirection: "column"
                }}>
                    <Typography fontWeight={"bold"} fontSize={"20px"}>Ready to Start Your Next Adventure?</Typography>
                    <Button style={{fontSize:"12px", height:"40px", width:"150px"}} size={"small"} color={"primary"} variant="contained" onClick={() => handleClickRegister()}>Create new trip</Button>
                </div>
            </div>
            <KeyboardArrowDownIcon style={{marginTop:"20px"}}></KeyboardArrowDownIcon>
            <Typography marginTop={"90px"} fontWeight={"bold"} fontSize={"25px"}>About Us</Typography>
            <Typography fontSize={"15px"} textAlign={"justify"} marginLeft={"400px"} marginRight={"400px"}>Welcome to our website, your ultimate companion for personalized travel experiences.
                Founded in 2024 by travel enthusiasts and technology innovators, we specialize in creating customized itineraries with activities that cater to the unique tastes and preferences of each traveler.
                Group travelers struggle to find itineraries and activities that align with everyone’s preferences, while solo travelers face challenges in finding like-minded companions with similar travel interests.
                Our mission is to revolutionize the way you travel by addressing these gaps.
                Our cutting-edge platform uses advanced AI algorithms to suggest perfect destinations, accommodations, and activities, ensuring your travel is not just a journey, but a collection of unforgettable memories.
                Join us on this journey to discover new destinations, create memorable experiences, and connect with fellow travelers who share your passions.
                We’re committed to making every trip a unique adventure.
            </Typography>

        </div>
    )
}