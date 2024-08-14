'use client'
import {useEffect, useState} from "react";
import styles from "./layout.module.css"
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import {useRouter} from 'next/navigation'
import {Typography, Button} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Grid from '@mui/material/Grid';
import {User} from "@/types/user";
import {getUserIdFromCookie} from "@/utils/client/authHelper";


export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {

    const [user, setUser] = useState<User|null>(null);
    const [searchInput, setSearchInput] = useState("");
    const router = useRouter();

    useEffect(() => {
        const getInitial = async () => {

            const id = getUserIdFromCookie();
            if (id === null) {
                router.push("/login")
            }

            const userRes = await fetch(`/api/user/${id}`)


            const user: User = await userRes.json();

            setUser(user)
        }
        getInitial()
    }, []);

    const handleClickSearch = async () => {
        const userRes = await fetch(`/api/user/username/${searchInput}`)

        const user: User = await userRes.json();

        if (user === null || user === undefined) {
            router.push("/noUserFound");
        } else {
            router.push("/user/" + user.userId);
        }

    }

    const handleClickHome = () => {
        router.push("/home");
    }

    const handleClickNotifications = () => {
        router.push("/notifications");
    }

    const handleClickYourTrips = () => {
        router.push("/yourTrips");
    }
    const handleClickYourProfile = () => {
        router.push("/profile");
    }

    return (
        <>
            <header className={styles.headerbar}>
                <Grid container>
                    <Grid item xs={3} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    </Grid>
                    <Grid item xs={6} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <Paper
                            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
                            className={styles.searchinput}>
                            <InputBase
                                sx={{ml: 1, flex: 1}}
                                placeholder="Search User... "
                                style={{color: "#000000"}}
                                onKeyDown={(ev) => {
                                    if (ev.key === 'Enter') {
                                        handleClickSearch()
                                    }
                                }}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <IconButton onClick={() => handleClickSearch()} sx={{p: '10px'}}
                                        className={styles.searchbutton}>
                                <SearchIcon className={styles.searchicon}/>
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item xs={3} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <Button onClick={() => handleClickYourProfile()} variant="text" className={styles.profilebar}>
                            {user !== null &&
                                <>
                                    <Avatar src="/broken-image.jpg" style={{color: "#ffffff", backgroundColor: "#000000"}}/>
                                    <Typography fontSize={"16px"}>{user?.username}</Typography>
                                </>
                            }
                        </Button>

                    </Grid>
                </Grid>

                <div className={styles.headerspacingbar}></div>
            </header>
            <nav className={styles.navbar} style={{display: "flex", flexDirection: "column"}}>
            <div className={styles.whiteNavBar}>
                    <Typography fontSize={"15px"} fontWeight={"bold"} marginLeft={"20px"}>Travel Rec-system</Typography>
                    <div className={styles.navButtonsBox}>
                    <Button variant="text" onClick={() => handleClickHome()}><div className={styles.navButtons}><HomeIcon/><Typography fontSize={"14px"}>Home</Typography></div></Button>
                    <Button variant="text" onClick={() => handleClickNotifications()}><div className={styles.navButtons}><NotificationsIcon/><Typography fontSize={"14px"}>Notifications</Typography></div></Button>
                    <Button variant="text" onClick={() => handleClickYourTrips()}><div className={styles.navButtons}><BookmarkIcon/><Typography fontSize={"14px"}>Your Trips</Typography></div></Button>
                    </div>
                </div>
                <div className={styles.greySpacingBar} style={{backgroundColor: "E0E0E0"}}></div>
            </nav>

            <div className={styles.mainbar}>
                {children}
            </div>
        </>    );
}
