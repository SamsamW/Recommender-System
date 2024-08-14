async function fetchPoiData(id) {
    const apiEndpointID = `https://www.outdooractive.com/api/project/api-dev-oa/oois/${id}?key=yourtest-outdoora-ctiveapi&lang=de`;

    const url = apiEndpointID.replace('{id}', id); // Template literal for URL construction

    console.log(url)


const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  })

  .then(response => response.json()) // Parse JSON response
  .then(jsonData => {

  // Access and return relevant data (modify based on your needs)
  //console.log(jsonData.poi)  // Assuming the first element is the desired data
  const hasFerienhaus = jsonData.poi.some(item => item.category.name === "Parkplatz");

  if(hasFerienhaus)
    return jsonData.poi
  })
  .catch(error => console.error('Error:', error)); // Catch and log any errors

  return response
  
  
}

async function main() {
    const poiData = await fetchPoiData(61866933);
    // console.log(poiData)
    const jsonString = JSON.stringify(poiData);
console.log(jsonString);
    
    
    
}

main()


