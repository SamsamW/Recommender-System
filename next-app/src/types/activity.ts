export interface Address {
    street: string,
    zipcode: string,
    town: string,
    countryname: string
}

export interface Activity {
    activityId: number,
    title: string,
    description: string,
    image: string,
    longitude: number,
    latitude: number,
    address: string,
    website: URL,
    openingHours: string,
    price: string,
    duration: number,
    reachablePublicTransport: boolean,
    category: string
}
