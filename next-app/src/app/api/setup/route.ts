import {NextRequest, NextResponse} from "next/server";
import prisma from "@/utils/client";

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {

    const destination = await prisma.destination.findFirst({})

    if (destination === null) {
        await prisma.destination.createMany({
            data: [
                {
                    "city": "Amsterdam",
                    "country": "Netherlands",
                    "longitude": 4.9041,
                    "latitude": 52.3676,
                    "image": "https://images.unsplash.com/photo-1583669483044-a94a5a729b2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "keywords": "['canals', 'art', 'cycling', 'historical', 'nightlife', 'tours', 'shopping', 'dining', 'parks', 'events', 'Canals', 'Art', 'Cycling', 'Historic sites', 'Nightlife', 'Coffee shops', 'Tulips', 'Bicycles', 'Museums', 'Red light district', 'Liberal', 'Anne Frank House', 'Houseboats', 'Windmills', 'Festivals', 'Architecture', 'Music', 'Museums', 'Futuristic Design', 'Shopping', 'Cultural', 'Solo', 'Budget']"
                },
                {
                    "city": "Barcelona",
                    "country": "Spain",
                    "longitude": 2.1734,
                    "latitude": 41.3851,
                    "image": "https://images.unsplash.com/photo-1570295029816-536074d04f55?q=80&w=2844&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "keywords": "['beaches', 'architecture', 'historic sites', 'nightlife', 'art', 'shopping', 'dining', 'sports', 'events', 'parks', 'Beaches', 'Architecture', 'Gaudi', 'Historic sites', 'Nightlife', 'Tapas', 'Art', 'Sagrada Familia', 'Mediterranean', 'La Rambla', 'Festivals', 'Soccer', 'Gothic Quarter', 'Parks', 'Urban', 'Golf', 'Nightlife', 'Historic', 'Nature', 'Food',  'Cultural', 'Beach and Resort', 'Family', 'Food and Wine']"
                },
                {
                    "city": "Berlin",
                    "country": "Germany",
                    "longitude": 13405,
                    "latitude": 52.52,
                    "image":"https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVybGlufGVufDB8fDB8fHwy",
                    "keywords": "['history', 'art', 'nightlife', 'shopping', 'dining', 'parks', 'events', 'technology', 'tours', 'museums', 'History', 'Art', 'Nightlife', 'Wall', 'Museums', 'Brandenburg Gate', 'Tech', 'Liberal', 'Parks', 'Beer', 'Checkpoint Charlie', 'East-West', 'Music', 'Alternative', 'Trendy', 'Sports', 'Gastronomic Delights', 'Art', 'Shopping', 'Music Festivals', 'Cultural', 'Family', 'Solo', 'Event and Festival']"
                },
                {
                    "city": "Graz",
                    "country": "Austria",
                    "longitude": 15.4395,
                    "latitude": 47.0707,
                    "image":"https://images.unsplash.com/photo-1559139663-53755c54e788?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhenxlbnwwfHwwfHx8Mg%3D%3D",
                    "keywords": "['historic sites', 'university town', 'art', 'parks', 'events', 'museums', 'shopping', 'dining', 'tours', 'culture', 'Historic sites', 'University town', 'Art', 'Murinsel', 'Parks', 'Mur River', 'Arnold Schwarzenegger', 'Schlossberg', 'Culture', 'Events', 'Green', 'Museums', 'Styrian cuisine', 'Festivals', 'Medieval', 'Cycling', 'Vibrant Markets', 'Gastronomic Delights', 'Sports', 'Historical Depth', 'Cultural', 'Solo', 'Budget']"
                },
                {
                    "city": "Innsbruck",
                    "country": "Austria",
                    "longitude": 11.4041,
                    "latitude": 47.2682,
                    "image":"https://images.unsplash.com/photo-1701276687758-0437839e7498?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5zYnJ1Y2t8ZW58MHx8MHx8fDI%3D",
                    "keywords": "['alps', 'winter sports', 'historic sites', 'parks', 'dining', 'shopping', 'events', 'tours', 'art', 'culture', 'Alps', 'Winter sports', 'Golden Roof', 'Skiing', 'Hiking', 'Tyrolean', 'Historic sites', 'Mountains', 'Parks', 'University', 'Cable cars', 'Nordkette', 'Adventure', 'Nature', 'Christmas markets', 'Hiking', 'Nature', 'Sports', 'Artistic Community', 'Festivals', 'Adventure', 'Nature and Wildlife']"
                },
                {
                    "city": "London",
                    "country": "United Kingdom",
                    "longitude": -0.1276,
                    "latitude": 51.5074,
                    "image":"https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "keywords": "['historical', 'art', 'shopping', 'dining', 'parks', 'events', 'museums', 'nightlife', 'tours', 'theatre', 'Historic sites', 'Art', 'Big Ben', 'Buckingham Palace', 'Theatres', 'Parks', 'River Thames', 'Shopping', 'Museums', 'Multicultural', 'Nightlife', 'Markets', 'Music', 'Finance', 'Royal', 'Music Festivals', 'Futuristic Design', 'Hiking', 'Cultural Mosaic', 'Museums', 'Cultural', 'Family', 'Food and Wine', 'Luxury', 'Solo']"
                },
                {
                    "city": "Madrid",
                    "country": "Spain",
                    "longitude": -3.7038,
                    "latitude": 40.4168,
                    "image":"https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFkcmlkfGVufDB8fDB8fHwy",
                    "keywords": "['historical', 'art', 'shopping', 'dining', 'parks', 'nightlife', 'events', 'sports', 'tours', 'culture', 'Historic sites', 'Art', 'Royal Palace', 'Prado Museum', 'Tapas', 'Flamenco', 'Soccer', 'Nightlife', 'Parks', 'Plaza Mayor', 'Retiro Park', 'Bullfighting', 'Festivals', 'Urban', 'Culture', 'Seaside Attractions', 'Hiking', 'Shopping', 'Museums', 'Music', 'Food and Wine', 'Solo', 'Event and Festival']"
                },
                {
                    "city": "Munich",
                    "country": "Germany",
                    "longitude": 11581,
                    "latitude": 48.1351,
                    "image":"https://images.unsplash.com/photo-1630872767553-058ab69d0fe2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXVuaWNofGVufDB8fDB8fHwy",
                    "keywords": "['beer', 'historical', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'sports', 'Beer', 'Oktoberfest', 'Historic sites', 'Bavaria', 'Art', 'Parks', 'Marienplatz', 'BMW', 'Nymphenburg Palace', 'English Garden', 'Christmas markets', 'Festivals', 'Mountains', 'Soccer', 'Tradition', 'Music Festivals', 'Cycling', 'Festivals', 'Artistic Community', 'Sports', 'Cultural', 'Nature and Wildlife', 'Solo', 'Event and Festival']"
                },
                {
                    "city": "Paris",
                    "country": "France",
                    "longitude": 2.3522,
                    "latitude": 48.8566,
                    "image":"https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "keywords": "['historical', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'fashion', 'theatre', 'Historic sites', 'Art', 'Eiffel Tower', 'Louvre', 'Notre Dame', 'Shopping', 'Fashion', 'Cafes', 'Romance', 'Seine River', 'Museums', 'Nightlife', 'Montmartre', 'Gardens', 'Cuisine', 'Festivals', 'Gastronomic Delights', 'Architecture', 'Boating', 'Seaside Attractions', 'Cultural', 'Family', 'Food and Wine', 'Luxury', 'Solo']"
                },
                {
                    "city": "Prague",
                    "country": "Czech Republic",
                    "longitude": 14.4378,
                    "latitude": 50.0755,
                    "image":"https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "keywords": "['historical', 'beer', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'museums', 'Historic sites', 'Charles Bridge', 'Old Town', 'Beer', 'Castles', 'Art', 'Gothic', 'Nightlife', 'Vltava River', 'Festivals', 'Music', 'Medieval', 'Museums', 'Parks', 'Affordable', 'Museums', 'Shopping', 'Seaside Attractions', 'Beaches', 'Golf', 'Budget', 'Cultural']"
                },
                {
                    "city": "Rome",
                    "country": "Italy",
                    "longitude": 12.4964,
                    "latitude": 41.9028,
                    "image":"https://images.unsplash.com/photo-1596627118111-5b6c7890bc1b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "keywords": "['history', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'museums', 'theatre', 'History', 'Art', 'Colosseum', 'Vatican', 'Architecture', 'Trevi Fountain', 'Roman Forum', 'Piazzas', 'Cuisine', 'Fashion', 'Museums', 'Nightlife', 'Parks', 'Ancient', 'Culture', 'Gastronomic Delights', 'Historic Churches', 'Roman Architecture', 'Lively Piazzas', 'Fashion Boutiques', 'Cultural', 'Historical', 'Solo']"
                },
                {
                    "city": "Stockholm",
                    "country": "Sweden",
                    "longitude": 18.0686,
                    "latitude": 59.3293,
                    "image":"https://images.unsplash.com/photo-1580339841933-f06ca55842d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RvY2tob2xtfGVufDB8fDB8fHwy",
                    "keywords": "['historical', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'museums', 'technology', 'Historic sites', 'Archipelago', 'Museums', 'Nordic', 'Waterways', 'Tech', 'Design', 'Green', 'Gamla Stan', 'Clean', 'Modern', 'Innovation', 'Parks', 'ABBA', 'Culture', 'Artistic Community', 'Cultural Mosaic', 'Tech', 'Historic', 'Shopping', 'Solo', 'Budget']"
                },
                {
                    "city": "Vienna",
                    "country": "Austria",
                    "longitude": 16.3738,
                    "latitude": 48.2082,
                    "image":"https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?q=80&w=2890&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "keywords": "['historic sites', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'museums', 'music', 'Historic sites', 'Art', 'Music', 'Imperial', 'Schönbrunn Palace', 'Coffeehouses', 'Danube River', 'Green', 'Museums', 'Theatres', 'Christmas markets', 'Parks', 'Culture', 'Opera', 'Elegant', 'Beaches', 'Nature Reserves', 'Nightlife', 'Hiking', 'Nature', 'Cultural', 'Historical', 'Solo']"
                },
                {
                    "city": "Zürich",
                    "country": "Switzerland",
                    "longitude": 8.5417,
                    "latitude": 47.3769,
                    "image":"https://images.unsplash.com/photo-1620562423895-ad4924643d43?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8enVyaWNofGVufDB8fDB8fHwy",
                    "keywords": "['financial', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'museums', 'historic sites', 'Financial hub', 'Art', 'Lake Zurich', 'Old Town', 'Clean', 'Shopping', 'Efficient', 'Museums', 'Modern', 'Banking', 'Green', 'Parks', 'Opera', 'Multicultural', 'High living standard', 'Shopping', 'Architecture', 'Art', 'Tech', 'Gastronomic Delights', 'Cultural', 'Solo', 'Wellness']"
                },
                {
                    "city": "Bern",
                    "country": "Switzerland",
                    "longitude": 7.4474,
                    "latitude": 46.9481,
                    "image":"https://images.unsplash.com/photo-1624543349832-2e70c917cc12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVybnxlbnwwfHwwfHx8Mg%3D%3D",
                    "keywords": "['historical', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'museums', 'university town', 'Historic sites', 'Medieval', 'Federal Palace', 'Aare River', 'Green', 'Bear Park', 'Zytglogge', 'University town', 'Swiss cuisine', 'Quiet', 'Museums', 'Clean', 'Parks', 'Traditional', 'Cultural', 'Museums', 'Shopping', 'Seaside Attractions', 'Beaches', 'Golf', 'Cultural', 'Historical', 'Solo']"
                },
                {
                    "city": "Luzern",
                    "country": "Switzerland",
                    "longitude": 8.3087,
                    "latitude": 47.0502,
                    "image":"https://images.unsplash.com/photo-1590217868274-5465bc689439?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV6ZXJufGVufDB8fDB8fHwy",
                    "keywords": "['historical', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'museums', 'scenic views', 'Historic sites', 'Chapel Bridge', 'Lake Lucerne', 'Mountains', 'Scenic', 'Jesuit Church', 'Museums', 'Tourism', 'Parks', 'Swiss cuisine', 'Medieval', 'Festivals', 'Clean', 'Nature', 'Traditional', 'Hiking', 'Nature', 'Sports', 'Artistic Community', 'Festivals', 'Cultural', 'Nature and Wildlife']"
                },
                {
                    "city": "Linz",
                    "country": "Austria",
                    "longitude": 14.2858,
                    "latitude": 48.3069,
                    "image":"https://images.unsplash.com/photo-1607554338776-4b7ceb683d3c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGluenxlbnwwfHwwfHx8Mg%3D%3D",
                    "keywords": "['historical', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'museums', 'university town', 'Historic sites', 'Danube River', 'Ars Electronica', 'Museums', 'University town', 'Steel industry', 'Green', 'Parks', 'Culture', 'Music', 'Modern', 'Scenic', 'Technology', 'Quiet', 'Tradition', 'Cycling', 'Vibrant Markets', 'Gastronomic Delights', 'Sports', 'Historical Depth', 'Cultural', 'Solo', 'Budget']"
                },
                {
                    "city": "Nice",
                    "country": "France",
                    "longitude": 7.2619,
                    "latitude": 43.7102,
                    "image":"https://images.unsplash.com/photo-1590341754869-61297d74b749?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fG5pY2UlMjBmcmFuY2V8ZW58MHx8MHx8fDI%3D",
                    "keywords": "['beaches', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'historic sites', 'scenic views', 'Beaches', 'French Riviera', 'Promenade des Anglais', 'Sunny', 'Old Town', 'Markets', 'Festivals', 'Art', 'Mediterranean', 'Cuisine', 'Scenic', 'Relaxed', 'Historic sites', 'Carnival', 'Touristic', 'Hiking', 'Nature', 'Sports', 'Artistic Community', 'Festivals', 'Beach and Resort', 'Cultural', 'Solo']"
                },
                {
                    "city": "Bordeaux",
                    "country": "France",
                    "longitude": -0.5792,
                    "latitude": 44.8378,
                    "image":"https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9yZGVhdXh8ZW58MHx8MHx8fDI%3D",
                    "keywords": "['wine', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'museums', 'historic sites', 'Wine', 'Vineyards', 'Historic sites', 'Garonne River', 'Gastronomy', 'Art', 'Shopping', 'Parks', 'Universities', 'Elegant', 'Museums', 'Festivals', 'Culture', 'Architecture', 'Scenic', 'Hiking', 'Nature', 'Sports', 'Artistic Community', 'Festivals', 'Cultural', 'Food and Wine']"
                },
                {
                    "city": "Torino",
                    "country": "Italy",
                    "longitude": 7.6869,
                    "latitude": 45.0703,
                    "image":"https://images.unsplash.com/photo-1502113130129-259236d6fabd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9yaW5vfGVufDB8fDB8fHwy",
                    "keywords": "['historical', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'museums', 'automobiles', 'Historic sites', 'Fiat', 'Mole Antonelliana', 'Piedmont', 'Industrial', 'Art', 'Parks', 'Chocolate', 'Museums', 'River Po', 'Elegant', 'Cuisine', 'Soccer', 'Shopping', 'Universities', 'Museums', 'Shopping', 'Seaside Attractions', 'Beaches', 'Golf', 'Cultural', 'Historical', 'Solo']"
                },
                {
                    "city": "Treviso",
                    "country": "Italy",
                    "longitude": 12.2459,
                    "latitude": 45.6665,
                    "image":"https://images.unsplash.com/photo-1630353492444-c2470cd9185e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJldmlzb3xlbnwwfHwwfHx8Mg%3D%3D",
                    "keywords": "['historical', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'wine', 'scenic views', 'Prosecco', 'Veneto', 'Historic sites', 'Canals', 'Medieval', 'Art', 'Shopping', 'Parks', 'Wine', 'Quiet', 'Scenic', 'Museums', 'Universities', 'Traditional', 'Culture', 'Museums', 'Shopping', 'Seaside Attractions', 'Beaches', 'Golf', 'Cultural', 'Budget', 'Solo']"
                },
                {
                    "city": "Brescia",
                    "country": "Italy",
                    "longitude": 10.2118,
                    "latitude": 45.5416,
                    "image":"https://images.unsplash.com/photo-1598626298696-9b019190576b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnJlc2NpYXxlbnwwfHwwfHx8Mg%3D%3D",
                    "keywords": "['historical', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'industry', 'museums', 'Historic sites', 'Lombardy', 'Industry', 'Art', 'Museums', 'Parks', 'Medieval', 'Shopping', 'Universities', 'Castles', 'Green', 'Tradition', 'Culture', 'Quiet', 'Cuisine', 'Museums', 'Shopping', 'Seaside Attractions', 'Beaches', 'Golf', 'Cultural', 'Historical', 'Solo']"
                },
                {
                    "city": "Napoli",
                    "country": "Italy",
                    "longitude": 14.2681,
                    "latitude": 40.8518,
                    "image":"https://images.unsplash.com/photo-1609244283184-96db6d696573?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmFwb2xpfGVufDB8fDB8fHwy",
                    "keywords": "['historical', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'beaches', 'cuisine', 'Pizza', 'Vesuvius', 'Historic sites', 'Museums', 'Pompeii', 'Amalfi Coast', 'Shopping', 'Nightlife', 'Cuisine', 'Chaos', 'Markets', 'Festivals', 'Ports', 'Culture', 'Soccer', 'Museums', 'Shopping', 'Seaside Attractions', 'Beaches', 'Golf', 'Cultural', 'Historical', 'Food and Wine', 'Solo']"
                },
                {
                    "city": "Catania",
                    "country": "Italy",
                    "longitude": 15.0873,
                    "latitude": 37.5023,
                    "image":"https://images.unsplash.com/photo-1595317177631-5b4dd3b738b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhdGFuaWF8ZW58MHx8MHx8fDI%3D",
                    "keywords": "['beaches', 'art', 'shopping', 'dining', 'parks', 'events', 'nightlife', 'tours', 'historic sites', 'museums', 'Sicily', 'Mount Etna', 'Beaches', 'Historic sites', 'Baroque', 'Nightlife', 'Cuisine', 'Markets', 'University town', 'Mediterranean', 'Green', 'Parks', 'Festivals', 'Ports', 'Culture', 'Museums', 'Shopping', 'Seaside Attractions', 'Beaches', 'Golf', 'Cultural', 'Historical', 'Nature and Wildlife']"
                }
            ]
        })
    }


    const prevTripKeys = await prisma.keywordPreviousTrip.findFirst()

    if (prevTripKeys === null) {

        const prevTripKeywords = [
            "Art", "Fashion", "History", "Romantic", "Gourmet", "Luxury Shopping", "Iconic Museums", "Stunning Architecture",
            "Cutting-edge Technology", "Trendsetting Fashion", "Rich Cultural Heritage", "Gastronomy", "Serene Gardens",
            "Ancient Temples", "Vibrant Nightlife", "Historical Landmarks", "Broadway Theater", "Modern Art", "World-class Museums",
            "Iconic Skyscrapers", "Central Park", "Diverse Cuisine", "Fashion Hub", "Historical Sites", "Tropical Beaches",
            "Surfing Paradise", "Sacred Temples", "Lush Nature", "Relaxing Retreats", "Traditional Culture", "Local Cuisine",
            "Spiritual Yoga", "Royal History", "Contemporary Art", "Famous Landmarks", "Theatrical Shows", "Diverse Neighborhoods",
            "Afternoon Tea", "Shopping Districts", "Extensive Parks", "Ancient Ruins", "Vatican City", "Renaissance Art",
            "Italian Cuisine", "Historic Churches", "Roman Architecture", "Lively Piazzas", "Fashion Boutiques",
            "Iconic Opera House", "Harbor Views", "Sunny Beaches", "Outdoor Lifestyle", "Vibrant Arts Scene", "Coffee Culture",
            "National Parks", "Multicultural Food", "Table Mountain", "Robben Island", "Wine Country", "Beachfront Promenades",
            "Cultural Diversity", "Adventure Sports", "Local Markets", "Historic Sites", "Cycling", "Artistic Community",
            "Historic", "Festivals", "Architecture", "Beaches", "Tech", "Food", "Hiking", "Futuristic Design",
            "Mountainous Landscapes", "Nature", "Golf", "Boating", "Music", "Nature Reserves", "Cultural Mosaic", "Museums",
            "Wine", "Gastronomic Delights", "Sports", "Shopping", "Historical Depth", "Theater", "Luxury", "Seaside Attractions",
            "Nightlife", "Music Festivals", "Vibrant Markets", "Scenic Views", "Cultural Festivals", "Art Galleries", "Culinary Tours", "Historic Villages",
            "Mountain Climbing", "River Cruises", "Desert Adventures", "Wildlife Safaris", "Marine Life",
            "Botanical Gardens", "Cityscape Photography", "Architectural Wonders", "Local Handicrafts",
            "Meditation Retreats", "Luxury Resorts", "Wine Tasting", "Street Food", "Historical Reenactments",
            "Folk Music", "Traditional Dances", "Sunset Cruises", "Pilgrimage Sites", "Heritage Walks",
            "Historical Monuments", "Trekking Trails", "Coastal Drives", "Urban Exploration", "Flea Markets",
            "Cultural Performances", "Festival Parades", "Historical Archives", "Classic Theaters",
            "Lighthouse Tours", "Countryside Escapes", "Harbor Cruises", "Underwater Exploration",
            "Ski Resorts", "Spa Retreats", "Island Hopping", "Historical Narratives", "Mountain Villages"
        ]

        const prevTripKeywordsSet = Array.from(new Set(prevTripKeywords));

        const prevTripKeywords_to_insert: { keyword: string }[] = prevTripKeywordsSet.map(e => {
            return {keyword: e}
        })

        await prisma.keywordPreviousTrip.createMany({
            data: prevTripKeywords_to_insert
        })

    }


    const generalInterests = await prisma.interest.findFirst()

    if(generalInterests === null) {

        const generalInterestKeywords = ["Reading Books", "Traveling", "Cooking", "Gardening", "Hiking", "Painting",
            "Photography", "Music", "Dancing", "Writing", "Art", "Cycling", "Fitness", "Yoga", "Meditation", "Gaming", "Computers", "Programming",
            "Watching Movies", "Watching TV Shows", "Collecting", "Fishing", "Camping", "Knitting", "Sewing", "Volunteering", "DIY Projects",
            "Sports", "Martial Arts", "Bird Watching", "Stargazing", "Astronomy", "Board Games", "Puzzle Solving", "Baking",
            "Running", "Swimming", "Wellness","Relaxing", "Surfing", "Skiing", "Snowboarding", "Skateboarding", "Drawing", "Pottery", "Origami",
            "Calligraphy", "Language Learning", "History", "Science", "Technology", "Investing", "Cooking Shows", "Travel Vlogs",
            "Fashion", "Interior Design", "Blogging", "Podcasting", "Stand-up Comedy", "Theater", "Magic Tricks", "Cosplaying", "Geocaching",
            "Parkour", "Animal Care", "Aquarium Keeping", "Genealogy", "Chess", "Card Games", "Soccer", "Basketball", "Baseball", "Football",
            "Tennis", "Golf", "Cricket", "Rugby", "Volleyball", "Table Tennis", "Badminton", "Rock Climbing", "Scuba Diving", "Horseback Riding",
            "Archery", "Fencing", "Billiards", "Bowling", "Ice Skating", "Roller Skating", "Juggling", "Whittling", "Lego Building", "Karaoke",
            "Beekeeping", "Metal Detecting", "Soap Making", "Brewing Beer", "Wine Tasting", "Chocolate Making", "Cheese Tasting", "Astrophotography", "Kite Flying",
            "Paragliding", "Hot Air Ballooning", "Amateur Radio", "Rock Collecting", "Meteorology", "Flower Arranging", "Scrapbooking", "Virtual Reality", "Augmented Reality", "Space Exploration",
            "Robotics", "Drone Flying", "Cryptography", "Mindfulness", "Minimalism", "Zero Waste Living", "Sustainable Living", "Tiny House Living"
        ];

        const generalInterestKeywords_to_insert: { interest: string }[] = generalInterestKeywords.map(e => {
            return {interest: e}
        })

        await prisma.interest.createMany({
            data: generalInterestKeywords_to_insert
        })
    }

    const hobbies = await prisma.hobby.findFirst()

    if(hobbies === null) {
        const hobbies = [
            "Gym", "Swimming", "Hiking", "Bowling", "Golfing", "Rock Climbing",
            "Skiing", "Snowboarding", "Ice Skating", "Roller Skating", "Tennis",
            "Basketball", "Soccer", "Baseball", "Football", "Flagfootball", "Volleyball", "Badminton",
            "Table Tennis", "Martial Arts", "Boxing", "Yoga Class", "Pilates Class",
            "Dance Class", "Spinning Class", "CrossFit", "Rowing", "Kayaking",
            "Canoeing", "Sailing", "Fishing", "Camping", "Bird Watching", "Scuba Diving",
            "Snorkeling", "Surfing", "Windsurfing", "Kitesurfing", "Stand-Up Paddleboarding",
            "Horseback Riding", "ATV Riding", "Go-Kart Racing", "Paintball",
            "Laser Tag", "Archery", "Shooting Range", "Hunting", "Bouldering",
            "Zip Lining", "Mountain Biking", "Cycling", "Triathlon",
            "Running", "Jogging", "Trail Running", "Parkour", "Orienteering",
            "Geocaching", "Nature Walks", "Botanical Garden Visits", "Zoo Visits",
            "Aquarium Visits", "Theme Park Visits", "Water Park Visits", "Museum Visits",
            "Art Gallery Visits", "Historical Site Tours", "City Tours", "Food Tours",
            "Wine Tasting", "Brewery Tours", "Escape Rooms", "Trampoline Parks",
            "Indoor Skydiving", "Real Skydiving", "Bungee Jumping", "Hot Air Ballooning",
            "Paragliding", "Parasailing", "Gliding", "Sailing",
            "Boating", "Cruises", "Concerts", "Music Festivals", "Theater Performances",
            "Opera Performances", "Ballet Performances", "Circus Shows", "Magic Shows",
            "Comedy Shows", "Improv Shows", "Karaoke", "Trivia Nights", "Pub Crawls",
            "Arcade Visits", "Mini Golf", "Driving Range", "Batting Cages", "Escape Games",
            "Rope Courses", "Obstacle Courses", "Fitness Bootcamps", "Open Mic Nights",
            "Film Screenings", "Drive-In Movies", "Outdoor Cinemas", "Planetarium Visits",
            "Observatory Visits", "Stargazing", "Astronomy Club Meetings",
            "Science Center Visits", "Tech Museum Visits", "Farm Visits",
            "Petting Zoos", "Horse Shows", "Dog Shows", "Cat Shows", "Agricultural Fairs",
            "Renaissance Fairs", "Street Fairs", "Farmers Markets", "Flea Markets",
            "Antique Markets", "Craft Fairs", "Book Signings", "Author Talks",
            "Library Visits", "Poetry Readings", "Lectures", "Workshops", "Classes",
            "Seminars", "Conferences", "Trade Shows", "Expos", "Symposia",
            "Hackathons", "Coding Bootcamps", "Startup Weekends", "Board Game Cafes",
            "LAN Parties", "eSports Tournaments", "Virtual Reality Arcades"
        ];

        const hobbiesSet = Array.from(new Set(hobbies));

        const hobbies_to_insert: { hobby: string }[] = hobbiesSet.map(e => {
            return {hobby: e}
        })

        await prisma.hobby.createMany({
            data: hobbies_to_insert
        })
    }

    return NextResponse.json("Setup done");
}