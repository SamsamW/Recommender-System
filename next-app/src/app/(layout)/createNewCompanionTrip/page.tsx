'use client'
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";
import Rating from "@mui/material/Rating";
import * as React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Slider from "@mui/material/Slider";
import {StatusCodes} from "http-status-codes";
import {Destination, Hobby, MatchQuestionaire} from "@prisma/client";
import {ErrorResponse} from "@/types/error";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";


export default function Page() {
    const [error, setError] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [ratingReliability, setRatingReliability] = useState<number>(0);
    const [ratingFlexibility, setRatingFlexibility] = useState<number>(0);
    const [ratingSociability, setRatingSociability] = useState<number>(0);
    const [ratingOrganization, setRatingOrganization] = useState<number>(0);
    const [ratingSharedInterests, setRatingSharedInterests] = useState<number>(0);
    const [selectedDayNight, setSelectedDayNight] = useState<string>('');
    const [selectedTravelPace, setSelectedTravelPace] = useState<string>('');
    const [ratingFood, setRatingFood] = useState<number>(0);
    const [selectedGroupSize, setSelectedGroupSize] = useState<string>("");

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

    const [ratingDestination1, setRatingDestination1] = useState<number>(0)
    const [ratingDestination2, setRatingDestination2] = useState<number>(0)
    const [ratingDestination3, setRatingDestination3] = useState<number>(0)

    const [allHobbies, setAllHobbies] = useState<Hobby[]>([])
    const [newHobbies, setNewHobbies] = useState<Hobby[]>([])

    const router = useRouter()


    useEffect(() => {
        const getInitial = async () => {

            const allHobbies = await fetch(`/api/hobbies`)

            if (!allHobbies.ok) {
                if (allHobbies.status === StatusCodes.BAD_REQUEST){
                    const error: ErrorResponse = await allHobbies.json()
                    setError(`Request Error:  ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${allHobbies.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const allhobbies: Hobby[] = await allHobbies.json()

            setAllHobbies(allhobbies)

            const allDests = await fetch(`/api/destinations`)

            if (!allDests.ok) {
                if (allDests.status === StatusCodes.BAD_REQUEST) {
                    const error: ErrorResponse = await allDests.json()
                    setError(`Request Error:  ${error.message}`);
                    return;
                } else {
                    setError(`Request Error (${allDests.status}): Something went wrong. Please try again later.`);
                    return;
                }
            }

            const allDestinationsMapped: Destination[] = await allDests.json()

            setAllDestinations(allDestinationsMapped)

        }
        getInitial()
    }, []);


    const handleClickCreate = async () => {
        setError("");

        if (startDate === null) {
            setError("Start date is required!");
            return
        }

        if (endDate === null) {
            setError("End date is required!");
            return
        }

        if (startDate <= new Date()) {
            setError("Start date has to be before now!");
            return;
        }

        if (endDate <= startDate) {
            setError("Start date has to be before the end date!");
            return;
        }

        if (selectedDayNight === "") {
            setError("Please choose a preference for night and day");
            return
        }

        if (selectedTravelPace === "") {
            setError("Please choose your preferred travel pace");
            return
        }

        if (selectedGroupSize === "") {
            setError("Please choose a preference for the group size");
            return
        }

        if(destination1 === null || destination2 === null || destination3 === null){
            setError("Please choose and rate destinations!");
            return
        }

        const styleRes = []

        const styleBool = [adventure, luxury, wellness, culture, natureAndWildlife, beachAndResort, family, foodAndWine, eventAndFestival, budget, shopping]

        const styleString = ["adventure", "luxury", "wellness", "culture", "natureAndWildlife", "beachAndResort", "family", "foodAndWine", "eventAndFestival", "budget", "shopping"]


        for(let i = 0; i < styleBool.length; i++) {
            if(styleBool[i]){
                styleRes.push(styleString[i])
            }
        }

        const accomondationRes = []

        const accomondationsBool = [hotel, hostel, vacationApartment, guesthouse, campsite, farm]
        const accomondationsString = ["hotel", "hostel", "vacationApartment", "guesthouse", "campsite", "farm"]

        for(let i = 0; i < accomondationsBool.length; i++) {
            if(accomondationsBool[i]){
                accomondationRes.push(accomondationsString[i])
            }
        }


        const hobbies = newHobbies.map(e => e.hobbyId)

        const response = await fetch('/api/matchQuestionaire',
            {
                method: "POST",
                body: JSON.stringify({
                    startDate: startDate,
                    endDate: endDate,
                    reliabilityRating: ratingReliability,
                    flexibilityRating: ratingFlexibility,
                    organizationRating: ratingOrganization,
                    sociabilityRating: ratingSociability,
                    sharedInterestsRating: ratingSharedInterests,
                    daynightPreference: selectedDayNight,
                    travelPacePreference: selectedTravelPace,
                    foodPreference: ratingFood,
                    groupSizePreference: selectedGroupSize,
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

        if (!response.ok) {
            if (response.status === StatusCodes.BAD_REQUEST) {
                setError("Something went wrong. Please try again later");
            }
            if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                setError("Something went wrong. Please try again later");
            }
            return;
        }

        const questionaire: MatchQuestionaire = await response.json()

        const res = fetch(`/api/matchQuestionaire/${questionaire.MatchQuestionaireId}/recommender`, {method: "POST"})


        router.push("/matchResult")
    }


    return (

        <div style={{margin: "50px", display: "flex", gap: "70px", flexDirection: "column"}}>

            <div style={{display: "flex", flexDirection: "row", gap: "90px"}}>
                <div style={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "center"}}>
                    <Typography fontWeight={"bold"} fontSize={"14px"}>Select start date: </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="" slotProps={{textField: {size: 'small'}}} onAccept={(date) => {
                                if (date !== null) {
                                    setStartDate(date.toDate());
                                }
                            }}/>
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div style={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "center"}}>
                    <Typography fontWeight={"bold"} fontSize={"14px"}>Select end date:</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="" slotProps={{textField: {size: 'small'}}}
                                        onAccept={(date) => {
                                            if (date !== null) {
                                                setEndDate(date.toDate());
                                            }
                                        }}/>
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>

            <div style={{display: "flex", flexDirection: "column", gap: "14px"}}>
                <Typography fontWeight={"bold"} fontSize={"14px"}>How important are these qualities in a travel
                    companion?</Typography>
                <div style={{display: "flex", flexDirection: "column", gap: "14px", marginLeft: "20px"}}>
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        <Typography fontSize={"14px"}>Reliability: </Typography>
                        <Rating
                            name="simple-controlled"
                            value={ratingReliability}
                            onChange={(event, newValue) => {
                                if (newValue !== null) {
                                    setRatingReliability(newValue);
                                }
                            }}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        <Typography fontSize={"14px"}>Flexibility: </Typography>
                        <Rating
                            name="simple-controlled"
                            value={ratingFlexibility}
                            onChange={(event, newValue) => {
                                if (newValue !== null) {
                                    setRatingFlexibility(newValue);
                                }
                            }}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        <Typography fontSize={"14px"}>Organization: </Typography>
                        <Rating
                            name="simple-controlled"
                            value={ratingOrganization}
                            onChange={(event, newValue) => {
                                if (newValue !== null) {
                                    setRatingOrganization(newValue);
                                }
                            }}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        <Typography fontSize={"14px"}>Sociability: </Typography>
                        <Rating
                            name="simple-controlled"
                            value={ratingSociability}
                            onChange={(event, newValue) => {
                                if (newValue !== null) {
                                    setRatingSociability(newValue);
                                }
                            }}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        <Typography fontSize={"14px"}>Shared Interests: </Typography>
                        <Rating
                            name="simple-controlled"
                            value={ratingSharedInterests}
                            onChange={(event, newValue) => {
                                if (newValue !== null) {
                                    setRatingSharedInterests(newValue);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>


            <div>
                <FormControl>
                    <Typography fontWeight={"bold"} fontSize={"14px"}>Are you an early bird or night owl? </Typography>
                    <RadioGroup
                        row
                        style={{marginLeft: "20px", marginTop: "5px"}}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="nightOwl" control={
                            <Radio value="nightOwl" onChange={(event) => {
                                setSelectedDayNight(event.target.value);
                            }}/>
                        }
                                          label={<Typography fontSize={"14px"}>Night owl</Typography>}
                        />
                        <FormControlLabel value="earlyBird" control={
                            <Radio value="earlybird" onChange={(event) => {
                                setSelectedDayNight(event.target.value);
                            }}/>}
                                          label={<Typography fontSize={"14px"}>Early bird </Typography>}
                        />
                        <FormControlLabel value="flexible" control={
                            <Radio value="flexible" onChange={(event) => {
                                setSelectedDayNight(event.target.value);
                            }}/>}
                                          label={<Typography fontSize={"14px"}>Flexible</Typography>}
                        />
                    </RadioGroup>
                </FormControl>
            </div>

            <div>
                <FormControl>
                    <Typography fontWeight={"bold"} fontSize={"14px"}>What is your preferred travel pace? </Typography>
                    <RadioGroup
                        style={{marginLeft: "20px", marginTop: "5px"}}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="fast-paced" control={
                            <Radio value="fast-paced" onChange={(event) => {
                                setSelectedTravelPace(event.target.value);
                            }}/>
                        }
                                          label={<Typography fontSize={"14px"}>Fast-paced (See as much as
                                              possible)</Typography>}
                        />
                        <FormControlLabel value="moderate" control={
                            <Radio value="moderate" onChange={(event) => {
                                setSelectedTravelPace(event.target.value);
                            }}/>}
                                          label={<Typography fontSize={"14px"}>Moderate (Balance between activities and
                                              relaxation)</Typography>}
                        />
                        <FormControlLabel value="slow-paced" control={
                            <Radio value="slow-paced" onChange={(event) => {
                                setSelectedTravelPace(event.target.value);
                            }}/>}
                                          label={<Typography fontSize={"14px"}>Slow-paced (Take it easy and
                                              enjoy)</Typography>}
                        />
                    </RadioGroup>
                </FormControl>
            </div>

            <div>
                <Typography fontWeight={"bold"} fontSize={"14px"}>How important is food in your travel
                    experience?</Typography>
                <Slider
                    sx={{width: "300px", marginLeft: "20px", marginTop: "15px"}} defaultValue={0} aria-label="Default"
                    valueLabelDisplay="auto" min={0}
                    max={10} marks={[{value: 0, label: '0',}, {value: 10, label: '10',},]}
                    onChange={(e, value) => setRatingFood(value as number)}
                />
            </div>


            <div>
                <FormControl>
                    <Typography fontWeight={"bold"} fontSize={"14px"}>What is your preferred group size? </Typography>
                    <RadioGroup
                        style={{marginLeft: "20px", marginTop: "5px"}}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="small" control={
                            <Radio value="small" onChange={(event) => {
                                setSelectedGroupSize(event.target.value);
                            }}/>
                        }
                                          label={<Typography fontSize={"14px"}>Small (2-3 Companions)</Typography>}
                        />
                        <FormControlLabel value="medium" control={
                            <Radio value="medium" onChange={(event) => {
                                setSelectedGroupSize(event.target.value);
                            }}/>}
                                          label={<Typography fontSize={"14px"}>Medium (5-10 Companions)</Typography>}
                        />
                        <FormControlLabel value="big" control={
                            <Radio value="big" onChange={(event) => {
                                setSelectedGroupSize(event.target.value);
                            }}/>}
                                          label={<Typography fontSize={"14px"}>Big (over 10 companions)</Typography>}
                        />
                    </RadioGroup>
                </FormControl>
            </div>

            <div style={{display: "flex", gap: "15px", flexDirection: "column"}}>
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
                            label=" "
                            InputLabelProps={{shrink: false}}
                        />
                    )}
                    onChange={((e, value) => {
                        setNewHobbies(value)
                    })}
                />
            </div>

            <div style={{display: "flex", gap: "25px", flexDirection: "column"}}>
                <Typography fontWeight={"bold"} fontSize={"14px"}>What kind of traveller are you?</Typography>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    flexFlow: "row wrap",
                    gap: "10px",
                    marginLeft: "20px"
                }}>
                    <FormControlLabel
                        control={
                            <Checkbox name="adventure" onChange={() => setAdventure(!adventure)}
                            />
                        }
                        label={<Typography fontSize={"14px"}>Adventure traveller</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="culture" onChange={() => setCulture(!culture)}/>
                        }
                        label={<Typography fontSize={"14px"}>Cultural traveller</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="luxury" onChange={() => setLuxury(!luxury)}/>
                        }
                        label={<Typography fontSize={"14px"}>Luxury traveller</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="wellness" onChange={() => setWellness(!wellness)}/>
                        }
                        label={<Typography fontSize={"14px"}>Wellness Traveler</Typography>}
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

            </div>

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
                            <Checkbox name="vacationApartment"
                                      onChange={() => setVacationApartment(!vacationApartment)}/>
                        }
                        label={<Typography fontSize={"14px"}>Vacation Apartment</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="hostel" onChange={(() => setHostel(!hostel))}/>
                        }
                        label={<Typography fontSize={"14px"}>Hostel</Typography>}
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

            <div>
                {error !== "" && <Typography style={{color: "red", fontSize: "13px"}}>{error}</Typography>}
                <Button style={{marginTop: "20px", width: "200px"}} color={"primary"} variant="contained"
                        onClick={() => handleClickCreate()}>Submit questionaire</Button>
            </div>
        </div>
    )
}
