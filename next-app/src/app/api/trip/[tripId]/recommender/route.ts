import {NextRequest, NextResponse} from "next/server";
import prisma from "@/utils/client";
import {NotificationType, PlanningStage} from "@prisma/client";
import {APIErrorResponse} from "@/utils/APIErrorResponse";
import {StatusCodes} from "http-status-codes";

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

export interface Destination {
    city: string,
    country: string,
    keywords: string,
    latitude: number,
    longitude: number,

}

export interface Result {
    activities: Activity[],
    city: Destination[],
}

export async function POST(request: NextRequest,{ params } : { params : {tripId: string } }) {

    const res = await fetch('https://d1b7-131-159-203-84.ngrok-free.app/groupRecommend',
        {
            method: "POST",
            body: JSON.stringify({
                "tripId": Number(params.tripId)
            }),
            headers: new Headers({'content-type': 'application/json'}),
        }
    )

    if (!res.ok) {
        return NextResponse.json("something went wring")
    }

    const resTemp = await res.json()



   /*const resTemp = {
       "activities": [
           {
               "address": "Prinsengracht 2, 1015 DV Amsterdam, Netherlands",
               "category": "Cafe",
               "city": "Amsterdam",
               "countryCode": "",
               "description": "Traditional Dutch brown café with over 300 years of history.",
               "duration": 60,
               "openingHours": "10:00-01:00",
               "price": 10,
               "ranking": "",
               "reachablePublicTransport": true,
               "title": "Café Papeneiland",
               "website": "https://www.cafepapeneiland.nl"
           },
           {
               "address": "Overhoeksplein 5, 1031 KS Amsterdam, Netherlands",
               "category": "Viewpoint",
               "city": "Amsterdam",
               "countryCode": "",
               "description": "360-degree view of Amsterdam with a rooftop bar and 'Over the Edge' swing.",
               "duration": 120,
               "openingHours": "10:00-22:00",
               "price": 15,
               "ranking": "",
               "reachablePublicTransport": true,
               "title": "A'DAM Lookout",
               "website": "https://www.adamlookout.com"
           },
           {
               "address": "Noordermarkt 43, 1015 NA Amsterdam, Netherlands",
               "category": "Cafe",
               "city": "Amsterdam",
               "countryCode": "",
               "description": "Famous cafe known for its traditional Dutch apple pie.",
               "duration": 60,
               "openingHours": "07:00-23:00",
               "price": 8,
               "ranking": "",
               "reachablePublicTransport": true,
               "title": "Winkel 43",
               "website": "https://www.winkel43.nl"
           },
           {
               "address": "{'street': 'Am Lippehafen', 'zipcode': '46485', 'town': 'Wesel', 'countryname': 'Deutschland'}",
               "category": "see",
               "city": "Kreis Wesel",
               "countryCode": "DE",
               "description": "\"The Lippe port was built in 1857 to promote shipping on the Lippe.\"",
               "duration": "",
               "openingHours": "\"None\"",
               "price": "",
               "ranking": 78.0,
               "reachablePublicTransport": false,
               "title": "Alter Lippehafen",
               "website": null
           },
           {
               "address": "Dam, 1012 JL Amsterdam, Netherlands",
               "category": "Building and monument",
               "city": "Amsterdam",
               "countryCode": "",
               "description": "17th-century palace offering guided tours and historic exhibits.",
               "duration": 90,
               "openingHours": "10:00-17:00",
               "price": 12,
               "ranking": "",
               "reachablePublicTransport": true,
               "title": "Royal Palace Amsterdam",
               "website": "https://www.paleisamsterdam.nl"
           },
           {
               "address": "Caves of Limburg, Netherlands",
               "category": "Cave",
               "city": "Amsterdam",
               "countryCode": "",
               "description": "Explore the beautiful caves situated underneath the Limburg region.",
               "duration": 90,
               "openingHours": "10:00-17:00",
               "price": 10,
               "ranking": "",
               "reachablePublicTransport": true,
               "title": "Caves in Limburg",
               "website": "https://www.cavesinlimburg.nl"
           },
           {
               "address": "Vondelpark, Amsterdam, Netherlands",
               "category": "Leisure activity",
               "city": "Amsterdam",
               "countryCode": "",
               "description": "Popular urban park with open-air theatre, playground, and cafes.",
               "duration": 120,
               "openingHours": "Open 24 hours",
               "price": 0,
               "ranking": "",
               "reachablePublicTransport": true,
               "title": "Vondelpark",
               "website": "https://www.vondelpark.com"
           },
           {
               "address": "{'countryname': 'Netherlands'}",
               "category": "museum",
               "city": "Request failed: 429 Client Error: Too Many Requests for url: https://geocode.maps.co/reverse?lat=52.359993&lon=4.885349&api_key=6689cf0c73825558027087gwdd4e547",
               "countryCode": "NL",
               "description": "Almost 8,000 paintings and sculptures as well as an extensive collection of historical artifacts make the Rijksmuseum one of the most famous and renowned art museums in the world.",
               "duration": "",
               "openingHours": null,
               "price": "",
               "ranking": 51.0,
               "reachablePublicTransport": false,
               "title": "Rijksmuseum",
               "website": null
           },
           {
               "address": "Stationsweg 166A, 2161 AM Lisse, Netherlands",
               "category": "Leisure activity",
               "city": "Amsterdam",
               "countryCode": "",
               "description": "World-famous tulip gardens open during spring.",
               "duration": 180,
               "openingHours": "08:00-19:30",
               "price": 18,
               "ranking": "",
               "reachablePublicTransport": true,
               "title": "Keukenhof Gardens",
               "website": "https://www.keukenhof.nl"
           },
           {
               "address": "Weteringschans 6-8, 1017 SG Amsterdam, Netherlands",
               "category": "Leisure activity",
               "city": "Amsterdam",
               "countryCode": "",
               "description": "Renowned music venue hosting concerts and club nights.",
               "duration": 240,
               "openingHours": "08:00-03:00",
               "price": 30,
               "ranking": "",
               "reachablePublicTransport": true,
               "title": "Paradiso",
               "website": "https://www.paradiso.nl"
           }
       ],
       "city": [
           {
               "city": "Amsterdam",
               "country": "Netherlands",
               "keywords": "['canals', 'art', 'cycling', 'historical', 'nightlife', 'tours', 'shopping', 'parks', 'events', 'Canals', 'Art', 'Cycling', 'Historic sites', 'Nightlife', 'Coffee shops', 'Tulips', 'Bicycles', 'Museums', 'Red light district', 'Liberal', 'Anne Frank House', 'Houseboats', 'Windmills', 'Festivals', 'Architecture', 'Music', 'Museums', 'Futuristic Design', 'Shopping', 'Cultural', 'Solo', 'Budget']",
               "keywords_description": "       \"Canals: Amsterdam is renowned for its picturesque canal system, which is a UNESCO World Heritage site.\",\n        \"Bicycles: Biking is a common mode of transportation in Amsterdam, with numerous bike rental services available.\",\n        \"Rijksmuseum: One of the most famous museums in Amsterdam, housing a vast collection of Dutch art and history.\",\n        \"Van Gogh Museum: Dedicated to the works of Vincent van Gogh and his contemporaries.\",\n        \"Anne Frank House: The house where Anne Frank wrote her diary during World War II, now a museum.\",\n        \"Red Light District: Known for its nightlife and adult entertainment.\",\n        \"Coffee Shops: Establishments where cannabis can be legally purchased and consumed.\",\n        \"Tulips: Symbolic of the Netherlands, with beautiful displays, especially at Keukenhof Gardens.\",\n        \"Heineken Experience: A tour and interactive experience at the original Heineken brewery.\",\n        \"Dam Square: The main town square in Amsterdam, surrounded by notable buildings like the Royal Palace.\",\n        \"Vondelpark: The largest city park in Amsterdam, popular for outdoor activities and events.\",\n        \"A�dam Lookout: An observation deck offering panoramic views of Amsterdam.\",\n        \"Museumplein: A cultural district home to several major museums and the Concertgebouw.\",\n        \"Bloemenmarkt: The world�s only floating flower market, located on a canal.\",\n        \"Westergas: A cultural complex with bars, restaurants, and event spaces.\",\n        \"NDSM Wharf: A cultural hotspot with art installations, festivals, and creative spaces.\",\n        \"Jordaan: A trendy neighborhood known for its narrow streets, boutique shops, and cafes.\",\n        \"Canal Cruises: Popular tours that offer a unique perspective of the city from the water.\",\n        \"Oude Kerk: Amsterdam�s oldest building and church, located in the Red Light District.\",\n        \"Nieuwe Kerk: A historic church on Dam Square, now used for exhibitions and events.\",\n        \"Leidseplein: A lively square known for its nightlife, theaters, and restaurants.\",\n        \"Albert Cuyp Market: A famous street market offering a wide variety of goods and foods.\",\n        \"Amsterdam Noord: An up-and-coming district known for its hip restaurants and cultural venues.\",\n        \"Concertgebouw: A concert hall renowned for its acoustics and classical music performances.\",\n        \"Rembrandt House Museum: The former home of painter Rembrandt, now a museum.\",\n        \"Artis Zoo: One of the oldest zoos in Europe, located in the city center.\",\n        \"Begijnhof: A historic courtyard dating back to the medieval period.\",\n        \"De Pijp: A vibrant neighborhood known for its multicultural atmosphere and markets.\",\n        \"Food Markets: Various markets offering local and international cuisine.\",\n        \"Amsterdam Light Festival: An annual event featuring light installations throughout the city.\""
           },
           {
               "city": "Bordeaux",
               "country": "France",
               "keywords": "['wine', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'museums', 'historic sites', 'Wine', 'Vineyards', 'Historic sites', 'Garonne River', 'Gastronomy', 'Art', 'Shopping', 'Parks', 'Universities', 'Elegant', 'Museums', 'Festivals', 'Culture', 'Architecture', 'Scenic', 'Hiking', 'Nature', 'Sports', 'Artistic Community', 'Festivals', 'Cultural', 'Food and Wine']",
               "keywords_description": "        \"Place de la Bourse: Famous for its stunning architecture and the Miroir d'eau reflecting pool.\",\n        \"La Cit� du Vin: A modern museum dedicated to wine culture and history.\",\n        \"Saint-Andr� Cathedral: A Gothic cathedral that is a UNESCO World Heritage site.\",\n        \"Garonne River: Offers beautiful views and boat tours along the river.\",\n        \"Pey-Berland Tower: Provides panoramic views of the city from its top.\",\n        \"Grand Th��tre de Bordeaux: An impressive opera house known for its architecture and performances.\",\n        \"Les Quais: The renovated waterfront area with shops, cafes, and walking paths.\",\n        \"Jardin Public: A large public garden perfect for relaxation and picnics.\",\n        \"Basilica of St. Michael: Known for its impressive Gothic architecture and tall spire.\",\n        \"Darwin Ecosystem: A creative space combining co-working areas, a skate park, and urban farms.\",\n        \"Dune of Pilat: The tallest sand dune in Europe, offering panoramic views of the Atlantic Ocean and the surrounding forest.\",\n        \"Arcachon Bay: A beautiful bay with sandy beaches, oyster farms, and bird-watching opportunities.\""
           }
       ],
       "groupQuestionaireId": [
           1,
           5
       ],
       "tripId": 8
   }*/



    if(resTemp === null){
        return APIErrorResponse.return_error("return not complete", StatusCodes.BAD_REQUEST);
    }

    if(resTemp.city === null|| resTemp.city.length === 0){
        return APIErrorResponse.return_error("return not complete", StatusCodes.BAD_REQUEST);
    }

    if(resTemp.activities === null){
        return APIErrorResponse.return_error("return not complete", StatusCodes.BAD_REQUEST);
    }




    //setDestination of trip
    const destRes = await prisma.destination.findFirst(
        {
            where: {
                AND: [
                    {city: resTemp.city[0].city},
                    {country: resTemp.city[0].country}
                ]
            }
        }
    )


    //destination not in db yet (should never happen!!)
    if(destRes === null){
        const createdest = await prisma.destination.create({
            data: {
                city: resTemp.city[0].city,
                country: resTemp.city[0].country,
                keywords: resTemp.city[0].keywords,
                image: "https://images.unsplash.com/photo-1564053489984-317bbd824340?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29ybGR8ZW58MHx8MHx8fDI%3D"
            }
        })



        const addDest = await prisma.trip.update({
            where: {
                tripId: Number(params.tripId)
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
                tripId: Number(params.tripId)
            },
            data:{
                destinationId: destRes.destinationId,
                planningStage: PlanningStage.FINISHED
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
                    tripId: Number(params.tripId),
                    activityId: createActivity.activityId
                }
            })
        }
        // add activity to trip
        else{
            const addActivity = await prisma.activityOnTrip.create({
                data:{
                    tripId: Number(params.tripId),
                    activityId: activityres.activityId
                }
            })
        }
    }

    //get all users that go on the trip
    const userOnTrip = await prisma.userOnTrip.findMany({
            where:{
                tripId: Number(params.tripId)
            }
    })

    if(userOnTrip === null){
        return APIErrorResponse.return_error("no users on trip", StatusCodes.BAD_REQUEST);
    }

    //create a notification for all users
    for (let i = 0; i<userOnTrip.length; i++){
        await prisma.notification.create({
         data:{
             userId: userOnTrip[i].userId,
             tripId: Number(params.tripId),
             notificationType: NotificationType.FINISHED
         }
        })
    }


    return NextResponse.json("all done");
}