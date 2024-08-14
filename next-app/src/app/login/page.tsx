'use client';
import HttpsIcon from '@mui/icons-material/Https';
import Button from '@mui/material/Button';
import {useState} from "react";
import {useRouter} from 'next/navigation'
import TextField from '@mui/material/TextField';
import {Typography} from "@mui/material";
import {StatusCodes} from "http-status-codes";



export default function Page ()  {

    const [error, setError] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter()

    const handleClickLogIn = async () => {
        if (username === "" && password === "") {
            setError("Username and Password are required");
            return;
        }

        if (username === "") {
            setError("Username is required");
            return;
        }
        if (password === "") {
            setError("Password is required");
            return;
        }
        setError("")

        const response = await fetch('/api/login',
            {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
        if (!response.ok) {
            if (response.status === StatusCodes.BAD_REQUEST) {
                setError("Username or Password worng");
            }
            if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                setError("Something went wrong. Please try again later");
            }
            return;
        }

        router.push("/home");

    }

    const handleClickRegister = async () => {
        router.push("/register");
    }

    return (
        <div style={{width: "100%", height: "100vh" ,backgroundColor:"white", display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"30px"}}>
                <div style={{display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginBottom:"15px", gap:"10px"}}>
                    <HttpsIcon style={{color: 'black', fontSize: "30px"}}></HttpsIcon>
                    <Typography color={"pri"} fontWeight={"bold"} style={{color: "black", fontSize: "16px"}}>Log into your account</Typography>
                </div>
                    <div style={{display: "flex", justifyContent:"center", alignItems:"center", flexDirection:"column", gap:"20px"}}>
                    <TextField style={{width: "220px"}} color="primary" label="Username" name="username" variant="outlined" size="small" defaultValue=""
                                 onChange={(e => {setUsername(e.target.value)})} />
                    <TextField style={{width: "220px"}} color={"primary"} type="password" label="Password" name="password" variant="outlined" size="small"
                                 defaultValue="" onChange={(e => {setPassword(e.target.value)})}/>
                </div>
                {error !== "" && <Typography style={{color: "red", fontSize: "13px"}}>{error}</Typography>}
                <div style={{display:"flex", gap:"20px"}}>
                    <Button style={{width: "100px"}} color={"primary"} variant="contained" onClick={() => handleClickLogIn()}>Log in</Button>
                    <Button style={{width: "100px"}} color="primary" variant="outlined" onClick={() => handleClickRegister()}>Register</Button>
                </div>
        </div>
    );
}