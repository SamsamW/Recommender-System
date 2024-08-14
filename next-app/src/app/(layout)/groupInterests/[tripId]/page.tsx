'use client'
import {Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Slider from '@mui/material/Slider';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";
import {getUserIdFromCookie} from "@/utils/client/authHelper";
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@/types/error";
import {UserOnTripUser} from "@/types/trip";
import {Hobby, Destination} from "@prisma/client";
import Rating from "@mui/material/Rating";



export default function Page ({params}: { params: { tripId: string } })  {
    const [error, setError] = useState<string>("")

    const [tripBudget, setTripBudget] = useState<number>(0)

    const [allDestinations, setAllDestinations] = useState<Destination[]>([])
    const [destination1, setDestination1] = useState<Destination|null>(null)
    const [destination2, setDestination2] = useState<Destination|null>(null)
    const [destination3, setDestination3] = useState<Destination|null>(null)

    const [hotel, setHotel] = useState<boolean>(false)
    const [hostel, setHostel] = useState<boolean>(false)
    const [vacationApartment, setVacationApartment] = useState<boolean>(false)
    const [guesthouse, setGuestHouse] = useState<boolean>(false)
    const [campsite, setCampsite] = useState<boolean>(false)
    const [farm, setFarm] = useState<boolean>(false)

    const [ratingDestination1, setRatingDestination1] = useState<number>(0)
    const [ratingDestination2, setRatingDestination2] = useState<number>(0)
    const [ratingDestination3, setRatingDestination3] = useState<number>(0)

    const [adventure, setAdventure] = useState<boolean>(false)
    const [luxury, setLuxury] = useState<boolean>(false)
    const [wellness, setWellness] = useState<boolean>(false)
    const [culture, setCulture] = useState<boolean>(false)
    const [natureAndWildlife, setNatureAndWildlife] = useState<boolean>(false)
    const [beachAndResort, setBeachAndResort] = useState<boolean>(false)
    const [family, setFamily] = useState<boolean>(false)
    const [foodAndWine, setFoodAndWine] = useState<boolean>(false)
    const [eventAndFestival, setEventAndFestival] = useState<boolean>(false)
    const [budget, setBudget] = useState<boolean>(false)
    const [shopping, setShopping] = useState<boolean>(false)

    const [allHobbies, setAllHobbies] = useState<Hobby[]>([])
    const [newHobbies, setNewHobbies] = useState<Hobby[]>([])

    const [userId, setUserId]= useState<number>(-1)
    const [participants, setParticipants] = useState<UserOnTripUser[]>([]);
    const router = useRouter()

    useEffect(() => {
        const getInitial = async () => {
            const id = getUserIdFromCookie();
            if (id === null) {
                router.push("/login")
                return
            }

            setUserId(id)

            const userRes = await fetch(`/api/trip/${Number(params.tripId)}/user`)

            if (!userRes.ok) {
                if (userRes.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await userRes.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${userRes.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const user: UserOnTripUser[] = await userRes.json();

            const userIndex = user.findIndex(e => (e.userId === id))
            if (userIndex === -1) {
                router.push("/noSuchTrip")
                return;
            }

            setParticipants(user)

            const allDests = await fetch(`/api/destinations`)

            if (!allDests.ok) {
                if (allDests.status === StatusCodes.BAD_REQUEST){
                    const error: ErrorResponse = await allDests.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${allDests.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const allDestinationsMapped: Destination[] = await allDests.json()

            setAllDestinations(allDestinationsMapped)

            const allHobbies = await fetch(`/api/hobbies`)

            if (!allHobbies.ok) {
                if (allHobbies.status === StatusCodes.BAD_REQUEST){
                    const error: ErrorResponse = await allHobbies.json()
                    setError(`Request Error: ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${allHobbies.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const allhobbies: Hobby[] = await allHobbies.json()

            setAllHobbies(allhobbies)

        }
        getInitial()
    }, []);

    const handleClickContinue = async () => {

        if(destination1 === null || destination2 === null || destination3 === null){
            setError("Please choose and rate destinations!");
            return
        }

        const accomondationsBool = [hotel, hostel, vacationApartment, guesthouse, campsite, farm]
        const accomondationsString = ["hotel", "hostel", "vacationApartment", "guesthouse", "campsite", "farm"]

        const accomondationRes = []

        for(let i = 0; i < accomondationsBool.length; i++) {
            if(accomondationsBool[i]){
                accomondationRes.push(accomondationsString[i])
            }
        }

        const styleBool = [adventure, luxury, wellness, culture, natureAndWildlife, beachAndResort, family, foodAndWine, eventAndFestival, budget, shopping]

        const styleString = ["adventure", "luxury", "wellness", "culture", "natureAndWildlife", "beachAndResort", "family", "foodAndWine", "eventAndFestival", "budget", "shopping"]

        const styleRes = []

        for(let i = 0; i < styleBool.length; i++) {
            if(styleBool[i]){
                styleRes.push(styleString[i])
            }
        }

        const hobbies = newHobbies.map(e => e.hobbyId)


        const res = await fetch(`/api/trip/${Number(params.tripId)}/questionaire`,
            {
                method: "POST",
                body: JSON.stringify({
                    budget: tripBudget,
                    destination1: destination1?.city,
                    destination2: destination2?.city,
                    destination3: destination3?.city,
                    destinationRating1: ratingDestination1,
                    destinationRating2: ratingDestination2,
                    destinationRating3: ratingDestination3,
                    hobbies: hobbies,
                    accomondations: accomondationRes,
                    travelStyles: styleRes
                }),
            }
            )

        if (!res.ok) {
            if (res.status === StatusCodes.BAD_REQUEST){
                const error: ErrorResponse = await res.json()
                setError(`Request Error: ${error.message}`);
                return;
            } else {
                setError(`Request Error (${res.status}): Something went wrong. Please try again later.`);
                return;
            }
        }

        if( participants.findIndex(e => (e.userId !== userId && !e.personalState)) === -1){
            /*const response = await fetch(`/api/trip/${Number(params.tripId)}/stage`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        userId: participants.map(e => e.userId),
                    }),
                })*/

            const response = fetch(`/api/trip/${Number(params.tripId)}/recommender`, {method: "POST"})

            router.push("/destinationResult/" + params.tripId)
        }
        else{
            router.push("/noGroupResultYet/" + params.tripId);
        }
    }

    return (
        <div style={{margin: "50px", display: "flex", gap: "70px", flexDirection: "column"}}>
            <div style={{display: "flex", gap: "35px", flexDirection: "column"}}>
                <Typography fontWeight={"bold"} fontSize={"14px"}>Whats you preferred budget per day (accomondation
                    included)?</Typography>
                <Slider
                    sx={{width: "500px", marginLeft: "20px"}} defaultValue={0} aria-label="Default"
                    valueLabelDisplay="auto" min={0}
                    max={500} marks={[{value: 0, label: '0€',}, {value: 500, label: '500€',},]}
                    onChange={(e, value) => setTripBudget(value as number)}
                />
            </div>

            <div style={{display: "flex", gap: "35px", flexDirection: "column"}}>
                <Typography fontWeight={"bold"} fontSize={"14px"}>List and rate 3 cities you have visited. Please
                    include both cities you have enjoyed and those you found less appealing.</Typography>
                <div style={{display: "flex", flexDirection: "row", gap: "30px"}}>
                    <Autocomplete
                        style={{width: "270px", marginLeft: "20px"}}
                        id="tags-standard"
                        popupIcon={false}
                        options={allDestinations}
                        getOptionLabel={(option) => option.city.concat(", ".concat(option.country))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label=""
                                InputLabelProps={{shrink: false}}
                                size={"small"}
                            />
                        )}
                        onChange={((e, value) => {
                            setDestination1(value)
                        })}
                    />
                    <Rating
                        name="simple-controlled"
                        value={ratingDestination1}
                        onChange={(event, newValue) => {
                            if (newValue !== null) {
                                setRatingDestination1(newValue);
                            }
                        }}
                    />
                </div>

                <div style={{display: "flex", flexDirection: "row", gap: "30px"}}>
                    <Autocomplete
                        style={{width: "270px", marginLeft: "20px"}}
                        id="tags-standard"
                        popupIcon={false}
                        options={allDestinations}
                        getOptionLabel={(option) => option.city.concat(", ".concat(option.country))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label=""
                                InputLabelProps={{shrink: false}}
                                size={"small"}
                            />
                        )}
                        onChange={((e, value) => {
                            setDestination2(value)
                        })}
                    />
                    <Rating
                        name="simple-controlled"
                        value={ratingDestination2}
                        onChange={(event, newValue) => {
                            if (newValue !== null) {
                                setRatingDestination2(newValue);
                            }
                        }}
                    />
                </div>

                <div style={{display: "flex", flexDirection: "row", gap: "30px"}}>
                    <Autocomplete
                        style={{width: "270px", marginLeft: "20px"}}
                        id="tags-standard"
                        popupIcon={false}
                        options={allDestinations}
                        getOptionLabel={(option) => option.city.concat(", ".concat(option.country))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label=""
                                InputLabelProps={{shrink: false}}
                                size={"small"}
                            />
                        )}
                        onChange={((e, value) => {
                            setDestination3(value)
                        })}
                    />
                    <Rating
                        name="simple-controlled"
                        value={ratingDestination3}
                        onChange={(event, newValue) => {
                            if (newValue !== null) {
                                setRatingDestination3(newValue);
                            }
                        }}
                    />
                </div>

            </div>
            <div style={{display: "flex", gap: "25px", flexDirection: "column"}}>
                <Typography fontWeight={"bold"} fontSize={"14px"}>What kind of traveller are you?</Typography>
                <div style={{display: "flex", flexDirection: "row", flexFlow: "row wrap", gap: "10px", marginLeft:"20px"}}>
                    <FormControlLabel
                        control={
                            <Checkbox name="adventure" onChange={() => setAdventure(!adventure)}
                            />
                        }
                        label={<Typography fontSize={"14px"}>Adventure traveller</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="culture" onChange={(() => setCulture(!culture))}/>
                        }
                        label={<Typography fontSize={"14px"}>Cultural traveller</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="wellness" onChange={() => setWellness(!wellness)}/>
                        }
                        label={<Typography fontSize={"14px"}>Wellness Traveler</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="luxury" onChange={() => setLuxury(!luxury)}/>
                        }
                        label={<Typography fontSize={"14px"}>Luxury traveller</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="natureAndWildLife"
                                      onChange={() => setNatureAndWildlife(!natureAndWildlife)}/>
                        }
                        label={<Typography fontSize={"14px"}>Nature and Wildlife traveller</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="beachAndResort" onChange={() => setBeachAndResort(!beachAndResort)}/>
                        }
                        label={<Typography fontSize={"14px"}>Beach and Resort traveller</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="family" onChange={() => setFamily(!family)}/>
                        }
                        label={<Typography fontSize={"14px"}>Family traveller</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="foodAndWine" onChange={() => setFoodAndWine(!foodAndWine)}/>
                        }
                        label={<Typography fontSize={"14px"}>Food and Wine traveller</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="budget" onChange={() => setBudget(!budget)}/>
                        }
                        label={<Typography fontSize={"14px"}>Budget traveller</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="eventAndFestval" onChange={() => setEventAndFestival(!eventAndFestival)}/>
                        }
                        label={<Typography fontSize={"14px"}>Event and Festival traveller</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="shopping" onChange={() => setShopping(!shopping)}/>
                        }
                        label={<Typography fontSize={"14px"}>Shopping traveller</Typography>}
                    />


                </div>
            </div>

            <div style={{display: "flex", gap: "35px", flexDirection: "column"}}>
                <Typography fontWeight={"bold"} fontSize={"14px"}>What do you like to do in your free time?</Typography>
                <Autocomplete
                    multiple
                    style={{width: "500px", marginLeft: "20px"}}
                    id="tags-standard"
                    popupIcon={false}
                    options={allHobbies}
                    getOptionLabel={(option) => option.hobby}
                    value={newHobbies.map(e => {
                        return allHobbies.findIndex(el => el.hobbyId === e.hobbyId)
                    }).map(e => allHobbies[e])}
                    defaultValue={[]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label=""
                            InputLabelProps={{shrink: false}}
                        />
                    )}
                    onChange={((e, value) => {
                        setNewHobbies(value)
                    })}
                />
            </div>


            <div style={{display: "flex", gap: "25px", flexDirection: "column"}}>
                <Typography fontWeight={"bold"} fontSize={"14px"}>What kind of accommodations do you
                    prefer?</Typography>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    flexFlow: "row wrap",
                    gap: "10px",
                    marginLeft: "20px"
                }}>
                    <FormControlLabel
                        control={
                            <Checkbox name="hotel" onChange={() => setHotel(!hotel)}
                            />
                        }
                        label={<Typography fontSize={"14px"}>Hotel</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="hostel" onChange={(() => setHostel(!hostel))}/>
                        }
                        label={<Typography fontSize={"14px"}>Hostel</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="vacationApartment"
                                      onChange={() => setVacationApartment(!vacationApartment)}/>
                        }
                        label={<Typography fontSize={"14px"}>Vacation Apartment</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="guestHouse" onChange={() => setGuestHouse(!guesthouse)}/>
                        }
                        label={<Typography fontSize={"14px"}>Guest House</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="campsite" onChange={() => setCampsite(!campsite)}/>
                        }
                        label={<Typography fontSize={"14px"}>Campsite</Typography>}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox name="farm" onChange={() => setFarm(!farm)}/>
                        }
                        label={<Typography fontSize={"14px"}>Farm</Typography>}
                    />

                </div>
            </div>
            {error !== "" &&
                <Typography style={{color: "red", fontSize: "13px", marginTop: "20px"}}>{error}</Typography>}

            <Button style={{marginTop: "20px", width: "200px"}} color={"primary"}
                    variant="contained" onClick={() => handleClickContinue()}>Submit and continue</Button>

        </div>
    )
}
