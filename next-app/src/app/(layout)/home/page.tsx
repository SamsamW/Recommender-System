'use client'
import {Typography} from "@mui/material";
import Image from 'next/image'
import homeImage from './homepage_photo.png'
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";

export default function Page ()  {

    const router = useRouter()

    const handleClickNewGroupTrip = () => {
        router.push("/createNewGroupTrip")
    }

    const handleClickNewCompanion = () => {
        router.push("/createNewCompanionTrip")
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px", gap: "10px"}}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography fontWeight={"bold"} fontSize={"30px"}>Explore the World, Your Way!</Typography>
                <Typography fontSize={"20px"}>Create your Dream Trip & Team Up for More Fun</Typography>
            </div>

            <div style={{position: "relative"}}>
                <div style={{position: "relative",
                    zIndex: 1,
                    marginBottom: "1em", marginTop: "2em", opacity:"0.5"}}>
                    <Image
                        src={homeImage}
                        alt="Picture home"
                        placeholder="blur"
                    >
                    </Image>
                </div>
                <div className="gold-box" style={{position: "absolute", zIndex: 3,
                    background: "white", width: "400px", height:"280px", left: "292px", gap:"50px",
                    top: "7em", display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column"}}>
                    <Button style={{width: "250px"}} color={"primary"} variant="contained" onClick={() => handleClickNewGroupTrip()}>Create new group trip</Button>
                    <Button style={{width: "250px"}} color={"primary"} variant="contained" onClick={() => handleClickNewCompanion()}>Search for new companion</Button>

                </div>
                </div>
        </div>
    )
}