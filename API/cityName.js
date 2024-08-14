const apiEndpoint = "https://www.outdooractive.com/api/project/api-dev-oa/pois/?key=yourtest-outdoora-ctiveapi&lang=de";

const categoryName = "Paris"
let thereIsdata = false

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

  const hasCountry = jsonData.poi.some(item => item.address.town === categoryName);

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
  
      const poiIds = jsonData.data.map(item => item.id).slice(0, 1000)

      for (const id of poiIds) {
        const poiData = await fetchPoiData(id);
        if(poiData) {
          console.log(categoryName, "data for ID", id);
          // console.log(poiData)
          //const jsonString = JSON.stringify(poiData);
            //console.log(jsonString);

          thereIsdata = true
          break;
          
        }
           
        
      }
      if (!thereIsdata) {
        console.log("No data found")
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  main()