const apiEndpoint = "https://www.outdooractive.com/api/project/api-dev-oa/pois/?key=yourtest-outdoora-ctiveapi&lang=de";

const categoryName = "Restaurant"
let thereIsdata = false

async function fetchPoiData(id) {
  const apiEndpointID = `https://www.outdooractive.com/api/project/api-dev-oa/oois/${id}?key=yourtest-outdoora-ctiveapi&lang=de`;

  const url = `${apiEndpointID.replace('{id}', id)}`; // Template literal for URL construction
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  })

  .then(response => response.json()) // Parse JSON response
  .then(jsonData => {

  // Access and return relevant data (modify based on your needs)
  const hasRestaurant = jsonData.poi.some(item => item.category.name === categoryName);

  if(hasRestaurant)
    return jsonData.poi
  })
  .catch(error => console.error('Error:', error)); // Catch and log any errors

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
  
      // Extract POI IDs from the response (modify this based on your data structure)
      const poiIds = jsonData.data.map(item => item.id).slice(0, 2220000)

      for (const id of poiIds) {
        const poiData = await fetchPoiData(id);
        if(poiData) {
          console.log(categoryName, "data for ID", id, ":", poiData);
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