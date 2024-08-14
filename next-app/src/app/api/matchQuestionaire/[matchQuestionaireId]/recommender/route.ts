import {NextRequest, NextResponse} from "next/server";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";
import prisma from "@/utils/client";
import {NotificationType} from "@prisma/client";

export interface Destination {
    city: string,
    country: string,
    keywords: string,
    latitude: number,
    longitude: number,

}

export interface Activity {
    address: string,
    category:string,
    description: string,
    duration: number,
    openingHours: string,
    price: string,
    reachablePublicTransport: boolean,
    title: string,
    website: string,
}


export interface Result {
    matchQuestionaireId: number[],
    matchedUserId: number[],
    activities: Activity[],
    city: Destination[],
    startDate: string,
    endDate: string,
}


export async function POST(request: NextRequest,{ params } : { params : {matchQuestionaireId: string } }) {

    const res = await fetch('https://d1b7-131-159-203-84.ngrok-free.app/matchRecommend',
        {
            method: "POST",
            body: JSON.stringify({
                "matchQuestionaireId": Number(params.matchQuestionaireId)
            }),
            headers: new Headers({'content-type': 'application/json'}),
        }
    )

    if (!res.ok) {
        return NextResponse.json("something went wrong")
    }

    const resTemp = await res.json()

    if(resTemp.hasOwnProperty("message")){
        return NextResponse.json("no match found")
    }



    /*const resTemp = {
    "MatchQuestionaireId": [
        19,
        20
    ],
    "MatchedUserId": [
        1,
        3
    ],
    "activities": [
        {
            "address": "{'street': 'Fraz. Pedemonte, 1', 'zipcode': '13021', 'town': 'Alagna Valsesia', 'countryname': 'Italy'}",
            "category": "museum",
            "city": "Vercelli",
            "countryCode": "IT",
            "description": "The Walser Museum is located in the Pedemonte hamlet (Z‚ÄôKantmud) a few minutes from the town of Alagna Valsesia. It was inaugurated in 1976 and set up in a building that bears two dates: 1628 on the kitchen door and 1902 on the ridge beam.",
            "duration": "",
            "openingHours": null,
            "price": "",
            "ranking": 47.0,
            "reachablePublicTransport": false,
            "title": "Museo Walser",
            "website": null
        },
        {
            "address": "{'street': 'Centre Commercial Leclerc', 'zipcode': '05000', 'town': 'Gap', 'countryname': 'France'}",
            "category": "restaurant",
            "city": "Hautes-Alpes",
            "countryCode": "FR",
            "description": "Located at the dynamic C.Cial E.Leclerc, Flunch offers you a moment of relaxation in a restaurant for young and old at any time of the day, from 8:30 a.m. to 9:30 p.m.",
            "duration": "",
            "openingHours": "Ganzj√§hrig, t√§glich von 8.30 Uhr bis 21.30 Uhr.",
            "price": "",
            "ranking": 75.0,
            "reachablePublicTransport": false,
            "title": "Flunch",
            "website": "http://www.flunch.fr"
        },
        {
            "address": "{'street': 'Rond Point Zone de Lachaup', 'zipcode': '05000', 'town': 'Gap', 'countryname': 'France'}",
            "category": "restaurant",
            "city": "Hautes-Alpes",
            "countryCode": "FR",
            "description": "Come and taste Italian flavors, in a set menu at lunchtime, or on a board to share in the evening. Events and shows starting Wednesday. Program on FB / insta. Privatization possible.Hours from Tuesday to Saturday 12 p.m. √† 2:30 p.m. and 7 p.m. to 10:30 p.m.",
            "duration": "",
            "openingHours": "Vom 01/01 bis 31/12 <br/>Betriebszeiten jeden Montag, Dienstag, Mittwoch, Donnerstag, Freitag und Samstag von 12 Uhr bis 14.30 Uhr. Jeden Donnerstag, Freitag und Samstag von 19 Uhr bis 22.30 Uhr.",
            "price": "",
            "ranking": 78.0,
            "reachablePublicTransport": false,
            "title": "Restaurant La Ruche",
            "website": "https://restaurantlaruche.com"
        },
        {
            "address": "{'street': 'Hameau de Polset', 'zipcode': '73500', 'town': 'Saint-Andr√©', 'countryname': 'France'}",
            "category": "waterfall",
            "city": "Savoy",
            "countryCode": "FR",
            "description": "Very beautiful waterfall at around 1850 m altitude, at the bottom of the Polset valley. Accessible √† foot only.",
            "duration": "",
            "openingHours": "Vom 15/05 bis 15/10.",
            "price": "",
            "ranking": 62.0,
            "reachablePublicTransport": false,
            "title": "Les Cascades de Polset (Source du vin)",
            "website": "https://www.haute-maurienne-vanoise.com"
        },
        {
            "address": "{'zipcode': '3914', 'town': 'Blatten bei Naters', 'countryname': 'Switzerland'}",
            "category": "gorge",
            "city": "Brig",
            "countryCode": "CH",
            "description": "\"The Gibidum reservoir was put into operation in 1969.\"",
            "duration": "",
            "openingHours": "\"None\"",
            "price": "",
            "ranking": 50.0,
            "reachablePublicTransport": false,
            "title": "Stausee Gibidum",
            "website": null
        },
        {
            "address": "{'countryname': 'Schweiz'}",
            "category": "gorge",
            "city": "Distretto di Lugano",
            "countryCode": "CH",
            "description": "\"None\"",
            "duration": "",
            "openingHours": "\"None\"",
            "price": "",
            "ranking": 10.0,
            "reachablePublicTransport": false,
            "title": "2 ‚Äì Gole della Capriasca/Vestigia del vecchio mulino",
            "website": null
        },
        {
            "address": "{'countryname': 'Italy'}",
            "category": "museum",
            "city": "Verbano-Cusio-Ossola",
            "countryCode": "IT",
            "description": "Historical-ethnographic museum housed in a typical Walser architecture building from 1786, in Staffa, used as a stable and barn",
            "duration": "",
            "openingHours": null,
            "price": "",
            "ranking": 63.0,
            "reachablePublicTransport": false,
            "title": "Museo della Montagna e del Contrabbando",
            "website": null
        },
        {
            "address": "{'street': '1 place Victor Masseglia', 'zipcode': '06670', 'town': 'Levens', 'countryname': 'France'}",
            "category": "museum",
            "city": "Maritime Alps",
            "countryCode": "FR",
            "description": "Backed by an old 14th century city gate, the Maison du Portal is a beautiful 17th century bourgeois residence opening onto a typical small square in the heart of the medieval village.",
            "duration": "",
            "openingHours": "31/12 <br/>√ñffnungszeiten jeden Montag, Dienstag, Mittwoch, Donnerstag, Freitag und Samstag von 9 Uhr bis 17 Uhr.<br/>Sonntag geschlossen.",
            "price": "",
            "ranking": 75.0,
            "reachablePublicTransport": false,
            "title": "La Galerie du Portal",
            "website": "https://levens.fr/tout-savoir-sur-la-commune-de-levens-levenstourisme/decouvrir-circuit-fleche-de-levens-tourismelevens/la-galerie-du-portal/"
        },
        {
            "address": "{'street': 'Localit√† Chiesa', 'zipcode': '13020', 'town': 'Rimella', 'countryname': 'Italy'}",
            "category": "museum",
            "city": "Vercelli",
            "countryCode": "IT",
            "description": "The ‚ÄúG.B. Museum Filippa‚Äù, the first museum of civic ownership established in Piedmont, originates from the donation of the collections of Giovanni Battista Filippa (1778-1838) to the Community of Rimella.",
            "duration": "",
            "openingHours": null,
            "price": "",
            "ranking": 67.0,
            "reachablePublicTransport": false,
            "title": "Museo Giovanni Battista Filippa",
            "website": null
        },
        {
            "address": "{'street': 'Quartier de Charance', 'zipcode': '05000', 'town': 'Gap', 'countryname': 'France'}",
            "category": "museum",
            "city": "Hautes-Alpes",
            "countryCode": "FR",
            "description": "Eco Museum exploring the agricultural, economic and human history of the Hautes-Alpes from 1790 to 1950. 6 themes to discover. Workshops for the farmer, the clog maker, the blacksmith, the wheelwright, mechanical energy... Choose two themes for your guided tour.",
            "duration": "",
            "openingHours": "Ganzj√§hrig, t√§glich.<br/>Ausnahmsweise geschlossen am 1. Januar, Ostermontag, Himmelfahrt, Pfingstmontag, 1. Mai, 8. Mai, 14. Juli, 15. August, 1. November, 11. Dezember und 25. Dezember.",
            "price": "",
            "ranking": 77.0,
            "reachablePublicTransport": false,
            "title": "Ecomus√©e de l'artisanat des Hautes-Alpes",
            "website": "http://www.musee.ws"
        }
    ],
    "city": {
        "city": "Torino",
        "country": "Italy",
        "keywords": "['historical', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'museums', 'automobiles', 'Historic sites', 'Fiat', 'Mole Antonelliana', 'Piedmont', 'Industrial', 'Art', 'Parks', 'Chocolate', 'Museums', 'River Po', 'Elegant', 'Cuisine', 'Soccer', 'Shopping', 'Universities', 'Museums', 'Shopping', 'Seaside Attractions', 'Beaches', 'Golf', 'Cultural', 'Historical', 'Solo']",
        "keywords_description": "        \"Mole Antonelliana: An iconic tower housing the National Cinema Museum.\",\n        \"Egyptian Museum: Home to one of the most important collections of Egyptian artifacts in the world.\",\n        \"Piazza Castello: The central square surrounded by historic buildings and palaces.\",\n        \"Turin Cathedral: Famous for the Shroud of Turin, a significant religious artifact.\",\n        \"Palazzo Madama: A historic palace and art museum.\",\n        \"Royal Palace of Turin: The former residence of the royal family, now a museum.\",\n        \"Piazza San Carlo: Known for its twin churches and vibrant atmosphere.\",\n        \"Parco del Valentino: A large park along the Po River with a medieval village.\",\n        \"Automobile Museum: Showcases the history of the automobile industry.\",\n        \"Lingotto: A former Fiat factory now transformed into a shopping and cultural center.\",\n        \"Po River: Italy's longest river, running through Turin, offering scenic walks and boat rides.\",\n        \"Superga Hill: Offers panoramic views of Turin and the Alps, accessible by a historic rack railway.\""
    },
    "endDate": [
        "Mon, 29 Jul 2024 22:00:00 GMT"
    ],
    "startDate": [
        "Mon, 22 Jul 2024 22:00:00 GMT"
    ]
}*/

    //no matches found
    if(resTemp === null){
        return NextResponse.json("nothing to match")
    }

    if(resTemp.city === null|| resTemp.activities === null || resTemp.MatchQuestionaireId === null || resTemp.MatchedUserId === null || resTemp.startDate === null || resTemp.endDate === null ){
        return APIErrorResponse.return_error("return not complete", StatusCodes.BAD_REQUEST);
    }

    //create new trip
    const trip = await prisma.trip.create({
        data: {
            startDate: new Date(resTemp.startDate[0]),
            endDate: new Date(resTemp.endDate[0]),
            name: "matched group trip :)",
            planningStage: "FINISHED"
        }
    })

    //setDestination of trip
    const destRes = await prisma.destination.findFirst(
        {
            where: {
                AND: [
                    {city: resTemp.city.city},
                    {country: resTemp.city.country}
                ]
            }
        }
    )

    //destination not in db yet (should never happen!!)
    if(destRes === null){
        const createdest = await prisma.destination.create({
            data: {
                city: resTemp.city.city,
                country: resTemp.city.country,
                keywords: resTemp.city.keywords,
                image: "https://images.unsplash.com/photo-1564053489984-317bbd824340?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29ybGR8ZW58MHx8MHx8fDI%3D"
            }
        })
        //add destination to trip
        const addDest = await prisma.trip.update({
            where: {
                tripId: trip.tripId
            },
            data:{
                destinationId: createdest.destinationId
            }
        })
    }
    //destination in db already -> only add destination to trip
    else{
        const addDest = await prisma.trip.update({
            where: {
                tripId: trip.tripId
            },
            data:{
                destinationId: destRes.destinationId
            }
        })
    }

    //setActivities
    for(let i = 0; i<resTemp.activities.length; i++){
        const activityres = await prisma.activity.findFirst(
            {
                where: {
                    AND: [
                        {title: resTemp.activities[i].title},
                        {address: resTemp.activities[i].address},
                        {category: resTemp.activities[i].category},
                        {description: resTemp.activities[i].description},
                        {website: resTemp.activities[i].website},
                    ]
                }
            }
        )
        // if activity is not in the db already -> create
        if(activityres === null){
            const createActivity = await prisma.activity.create({
                data: {
                    title: resTemp.activities[i].title,
                    description: resTemp.activities[i].description,
                    address: resTemp.activities[i].address,
                    website: resTemp.activities[i].website,
                    openingHours: resTemp.activities[i].openingHours,
                    price: resTemp.activities[i].price.toString() === "" ? null : Number(resTemp.activities[i].price),
                    duration: resTemp.activities[i].duration.toString() === "" ? null : Number(resTemp.activities[i].duration),
                    reachablePublicTransport: resTemp.activities[i].reachablePublicTransport,
                    category: resTemp.activities[i].category,
                }
            })

            //add activity to trip
            const addActivity = await prisma.activityOnTrip.create({
                data:{
                    tripId: trip.tripId,
                    activityId: createActivity.activityId
                }
            })
        }
        // add activity to trip
        else{
            const addActivity = await prisma.activityOnTrip.create({
                data:{
                    tripId: trip.tripId,
                    activityId: activityres.activityId
                }
            })
        }
    }

    //get all users that go on the trip
    //create a notification for all users and add all users to trip
    for (let i = 0; i<resTemp.MatchedUserId.length; i++){
        await prisma.notification.create({
            data:{
                userId: resTemp.MatchedUserId[i],
                tripId: trip.tripId,
                notificationType: NotificationType.NEW_MATCH
            }
        })

        await prisma.userOnTrip.create({
            data:{
                userId: resTemp.MatchedUserId[i],
                tripId: trip.tripId,
                personalState: true
            }
        })
    }

    //delete all matchQuestionaires
    for(let i = 0; i<resTemp.MatchQuestionaireId.length; i++){
        await prisma.matchQuestionaire.delete({
            where:{
                MatchQuestionaireId: resTemp.MatchQuestionaireId[i],
            }
        })
    }

    return NextResponse.json("done")


}