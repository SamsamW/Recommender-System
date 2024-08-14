const apiEndpoint = "https://www.outdooractive.com/api/project/api-dev-oa/pois/?key=yourtest-outdoora-ctiveapi&lang=de";

const categoryName = ["France", "Japan", "USA", "Indonesia", "United Kingdom", "Italy",
    "Australia", "South Africa", "Thailand", "UAE", "Turkey",
    "Netherlands", "Czech Republic", "Brazil", "China", "Morocco",
    "Russia", "Spain", "South Korea", "Portugal", "Mexico", "Austria",
    "Argentina", "Singapore", "Egypt", "Greece", "Ireland", "Canada",
    "Germany", "Israel", "Taiwan", "Hungary", "Peru", "Cuba", "Chile",
    "India", "Finland", "Sweden", "Malaysia", "Kenya", "Denmark",
    "Norway", "Belgium", "Poland", "Ukraine", "Lebanon", "Romania",
    "Vietnam", "Philippines", "Iceland", "Switzerland", "Qatar",
    "Oman", "Guatemala", "Dominican Republic", "Costa Rica", "Panama",
    "Colombia", "Venezuela", "Ecuador", "Nigeria", "Ghana", "Tanzania",
    "Belarus", "Serbia", "Georgia", "Armenia", "Pakistan", "Nepal",
    "Sri Lanka"]

let thereIsdata = false
let count = 222000;

async function fetchPoiData(id) {
  const apiEndpointID = `https://www.outdooractive.com/api/project/api-dev-oa/oois/${id}?key=yourtest-outdoora-ctiveapi&lang=de`;

  const url = `${apiEndpointID.replace('{id}', id)}`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  })

  .then(response => response.json()) 
  .then(jsonData => {

  const hasCountry = jsonData.poi.some(item => categoryName.includes(item.address.countryname));

  if(hasCountry)
    return jsonData.poi
  })
  .catch(error => console.error('Error:', error)); 
  return response
}
  
  async function main() {
    try {
      const response = await fetch(apiEndpoint, {
        headers: {
          'Accept': 'application/json'
        }
      });
      const jsonData = await response.json();
  
      const poiIds = jsonData.data.map(item => item.id).slice(0, 1)

      console.log(poiIds.length)

      for (const id of poiIds) {
        const poiData = await fetchPoiData(id);
        count++;
        if(poiData) {
          // console.log(categoryName, "data for ID", id);
          // console.log(poiData)
          const jsonString = JSON.stringify(poiData);
            console.log(jsonString);

          thereIsdata = true
          
          break;
          
        }
           
        
      }

      console.log(count)
      
      if (!thereIsdata) {
        console.log("No data found")
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log(count)

    }
  }
  
  main()