const apiEndpoint = "https://www.outdooractive.com/api/project/api-dev-oa/filter/tour?category=6520&key=yourtest-outdoora-ctiveapi"

const categoryName = ["Frankreich", "Japan", "USA", "Indonesia", "United Kingdom", "Italien",
  "Australien", "Südafrika", "Thailand", "Türkei",
  "Niederlande", "Brasilien", "China",
  "Russland", "Spanien", "Südkorea", "Portugal", "Mexico", "Österreich",
  "Argentinien", "Singapur", "Ägypten", "Griechenland", "Kanada",
  "Deutschland",
  "Indien", "Finnland", "Schweden",
  "NOrwegen", "Belgien",
  "Vietnam", "Philippinen", "Schweiz"]

let thereIsdata = false
let countAll = 0;
let count = 0;

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
  
      const poiIds = jsonData.data.map(item => item.id).slice(0, 1000000000)

      console.log(poiIds.length)

      for (const id of poiIds) {
        const poiData = await fetchPoiData(id);
        countAll++;
        if(poiData) {
          // console.log(categoryName, "data for ID", id);
          // console.log(poiData)
          const jsonString = JSON.stringify(poiData);
            console.log(jsonString);

          thereIsdata = true
          count++;
          
          // break;
          
        }
           
        
      }

      console.log(countAll)
      console.log(count)
      
      if (!thereIsdata) {
        console.log("No data found")
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);

    }
  }
  
  main()