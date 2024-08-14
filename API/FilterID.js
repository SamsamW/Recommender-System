const apiEndpoint = "https://www.outdooractive.com/api/project/api-dev-oa/filter/tour?category=6127&key=yourtest-outdoora-ctiveapi"

async function fetchPoiData() {

  const response = await fetch(apiEndpoint, {
    headers: {
      'Accept': 'application/json'
    }
  })

  .then(response => response.json()) // Parse JSON response
  .then(jsonData => {

  // Access and return relevant data (modify based on your needs)

    return jsonData
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
      const poiIds = jsonData.data.map(item => item.id)

      console.log(poiIds)

      
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  main()