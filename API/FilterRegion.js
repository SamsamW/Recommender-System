const apiEndpoint = "https://www.outdooractive.com/api/project/api-dev-oa/region/tree?key=yourtest-outdoora-ctiveapi";

// Fetch JSON data using Fetch API with the Accept header
fetch(apiEndpoint, {
  headers: {
    'Accept': 'application/json'
  }
})
  .then(response => response.json()) // Parse JSON response
  .then(jsonData => {
    // Access "name" parameter based on API response structure
    let name; // Declare to avoid potential errors if "name" is absent

    for (const region of jsonData.region) {
        
            console.log("Name:", region.name);
            
          
        
      }

  })
  .catch(error => {
    console.error("Error fetching or parsing JSON data:", error);
  });
