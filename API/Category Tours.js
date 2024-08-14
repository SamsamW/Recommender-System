const apiEndpoint = "https://www.outdooractive.com/api/project/api-dev-oa/category/tree/tour?key=yourtest-outdoora-ctiveapi&lang=de";

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

    for (const outerCategory of jsonData.category) {
        for (const category of outerCategory.category) {
          console.log("Name:", category.name);
        }
      }


    if (name) { // Display name only if found
      console.log("Name:", name);
    }
  })
  .catch(error => {
    console.error("Error fetching or parsing JSON data:", error);
  });
