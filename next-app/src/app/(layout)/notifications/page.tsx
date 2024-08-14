'use client'
import {NewTripBox} from "@/components/NewTripBox";
import {ItsYourTurnBox} from "@/components/ItsYourTurnBox";
import {DestinationFoundBox} from "@/components/DestinationFoundBox";
import {ItsAMatchBox} from "@/components/ItsAMatchBox";
import {useEffect, useState} from "react";
import {getUserIdFromCookie} from "@/utils/client/authHelper";
import {Notification} from "@/types/notification";
import {useRouter} from "next/navigation";
import {NotificationType} from "@prisma/client";
import styles from "./notification.module.css"
import * as React from "react";

export default function Page() {

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [notificationState, setNotificationState] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        const getinitial = async () => {

            const id = getUserIdFromCookie();
            if (id === null) {
                router.push("/login")
            }

            const notificationres = await fetch(`/api/notifications/${id}`)

            const notifications: Notification[] = await notificationres.json();

            setNotifications(notifications.sort((a, b) => new Date(b.createdAt).getFullYear() - new Date(a.createdAt).getFullYear() || new Date(b.createdAt).getMonth() - new Date(a.createdAt).getMonth() || new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate()))

            setNotifications(notifications)
            setNotificationState(true)

        }
        getinitial()


    }, []);
    return (
        <>
            {!notificationState ?
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "40px",
                    marginLeft: "40px",
                    marginTop: "20px",
                    gap: "20px"
                }}>
                    <div className={styles.skeleton} style={{width: "100%", height: "120px"}}></div>
                    <div className={styles.skeleton} style={{width: "100%", height: "120px"}}></div>
                    <div className={styles.skeleton} style={{width: "100%", height: "120px"}}></div>
                    <div className={styles.skeleton} style={{width: "100%", height: "120px"}}></div>
                </div>
                :
                <div style={{marginBottom:"30px"}}>
                    {notifications.map(n => {
                        if (n.notificationType === NotificationType.NEW_TRIP) {
                            return <NewTripBox key={n.notificationId} {...n}></NewTripBox>
                        } else if (n.notificationType === NotificationType.NEW_STAGE) {
                            return <ItsYourTurnBox key={n.notificationId} {...n}></ItsYourTurnBox>
                        } else if (n.notificationType === NotificationType.FINISHED) {
                            return <DestinationFoundBox key={n.notificationId} {...n}></DestinationFoundBox>
                        } else if(n.notificationType === NotificationType.NEW_MATCH){
                            return <ItsAMatchBox key={n.notificationId} {...n}></ItsAMatchBox>
                        }
                    })}
                </div>
            }
        </>
    )
}