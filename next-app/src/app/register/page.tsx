'use client'
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import {useRouter} from "next/navigation";
import {StatusCodes} from "http-status-codes";
import {z} from "zod"

export default function Page ()  {

    const [email, setEmail ] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [occupation, setOccupation] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter()


    const handleClickLogIn = () => {
        router.push("/login")
    }

    const handleClickRegister = async () => {

        const emailSchema = z.string().email({ message: "Ungültige E-Mail Adresse" });

        try {
            emailSchema.parse(email);
        } catch (error) {
            setError("Email is not valid...");
            return

        }

        if (email === "") {
            setError("Email is required");
            return
        }
        if (username === "") {
            setError("Username is required");
            return
        }
        if (age === "") {
            setError("Age is required");
            return
        }
        if (gender === "") {
            setError("Gender is required");
            return
        }
        if (occupation === "") {
            setError("Occupation is required");
            return
        }
        if (password === "") {
            setError("Password is required");
            return
        }
        if (password !== passwordConfirm) {
            setError("Passwords have to be the same");
            return
        }
        setError("")
        const response = await fetch('/api/register',
            {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    email: email,
                    age: Number(age),
                    gender: gender,
                    occupation: occupation,
                    password: password,
                }),
            })


        if (!response.ok) {
            if (response.status === StatusCodes.BAD_REQUEST) {
                setError("Username or Email already exists");
            }
            if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                setError("Something went wrong. Please try again later");
            }
            return;
        }
        else{
            router.push("/login")
        }

    }


    return(
        <div style={{backgroundColor:"white", height:"100vh"}}>
            <Typography fontWeight={"bold"} style={{fontSize: "18px"}}> Travel Rec-system</Typography>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:"column", marginTop:"5px"}}>
                <Typography fontWeight={"bold"} style={{fontSize: "20px"}}>Create an account</Typography>
                <Typography  style={{fontSize: "16px"}}>Enter your information to sign up</Typography>
                <div style={{display:"flex",justifyContent:"center", alignItems:"center", flexDirection:"column", gap:"25px", marginTop:"30px"}}>
                    <TextField style={{width: "350px"}} label="Email" name="email" variant="outlined" size="small" defaultValue=""
                               onChange={(e => {setEmail(e.target.value)})} />
                    <TextField style={{width: "350px"}} label="Username" name="username" variant="outlined" size="small" defaultValue=""
                               onChange={(e => {setUsername(e.target.value)})} />
                    <Autocomplete disablePortal id="combo-box-demo" options={age_options} sx={{ width: 350 }}
                                  size={"small"} renderInput={(params) => <TextField {...params} label="Age" />} onChange={((e, value) => {
                        if (value === null) {setAge("")} else{setAge(value.label)}
                    })}/>
                    <Autocomplete  disablePortal id="combo-box-demo1" options={gender_options} sx={{ width: 350 }}
                        size={"small"} renderInput={(params) => <TextField {...params} label="Gender" />} onChange={((e, value) => {
                        if (value === null) {setGender("")} else{setGender(value.label)}
                    })}/>
                    <Autocomplete disablePortal id="combo-box-demo2" options={occupation_options} sx={{ width: 350 }}
                                  size={"small"} renderInput={(params) => <TextField {...params} label="Occupation" />} onChange={((e, value) => {
                        if (value === null) {setOccupation("")} else{setOccupation(value.label)}
                    })}/>
                    <TextField style={{width: "350px"}} type="password" label="Password" name="password" variant="outlined" size="small" defaultValue=""
                               onChange={(e => {setPassword(e.target.value)})} />

                    <TextField style={{width: "350px"}} type="password" label="Confirm Password" name="Password" variant="outlined" size="small" defaultValue=""
                               onChange={(e => {setPasswordConfirm(e.target.value)})} />
                    {error !== "" && <Typography style={{color: "red", fontSize: "13px"}}>{error}</Typography>}
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", gap:"10px"}}>
                    <Button style={{width: "350px"}} color={"primary"} variant="contained" onClick={() => handleClickRegister()}>Register</Button>
                    <Typography fontSize={"13px"} color={"black"}>- Already a member? -</Typography>
                    <Button style={{width: "350px"}} color={"primary"} variant="outlined" onClick={() => handleClickLogIn()}>Log In using your Account</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const gender_options = [
    { label: 'female'},
    { label: 'male'},
    { label: 'diverse'},
    { label: 'perefere not to say'}
]

const occupation_options = [
    { label: 'working'},
    { label: 'student'},
    { label: 'unemployed'},
    { label: 'retired'},
]

let age_options = [
    { label: '18'},
];

for (let i = 19; i <= 130; i++) {
    age_options.push({ label: i.toString() });
}

