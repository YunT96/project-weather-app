import getWeather from "./api";

const updateDom = (weatherInfo) => {
  const resultsContainer = document.querySelector(".results-container");

  switch (weatherInfo.conditions) {
    case "Sunny":
      document.body.style.backgroundColor = "#fff5b5";
      break;
    case "Clear":
      document.body.style.backgroundColor = "#d9fff8";
      break;
    case "Partially cloudy":
      document.body.style.backgroundColor = "#c1e3e0";
      break;
    case "Rain, Overcast":
      document.body.style.backgroundColor = "#c5cff0";
      break;
    case "Rain, Partially cloudy":
      document.body.style.backgroundColor = "#c5cff0";
      break;
    case "Rain":
      document.body.style.backgroundColor = "#c5cff0";
      break;
    case "Cloudy":
      document.body.style.backgroundColor = "#c1e3e0";
      break;
    case "Overcast":
      document.body.style.backgroundColor = "#c1e3e0";
      break;
    case "Snow":
      document.body.style.backgroundColor = "#ebeef7";
      break;
    default:
      document.body.style.backgroundColor = "white";
      break;
  }

  resultsContainer.innerHTML = `
        <h2>Weather in ${weatherInfo.location}</h2>
        <p>Conditions: ${weatherInfo.conditions}</p>
        <p>Temperature: ${weatherInfo.tempurature} C</p>
        <p>Feels like: ${weatherInfo.feelsLike} C</p>
        <p>Humidity: ${weatherInfo.humidity}%</p>
        <p>Wind speed: ${weatherInfo.wind} m/s</p>
        <p>Visibility: ${weatherInfo.visibility} meters</p>
        <!-- Add more weather information here -->
      `;
};

export default async function initApp() {
  const searchBar = document.getElementById("search-bar");

  // Get weather info from local storage
  const storedLocation = localStorage.getItem("location");
  if (storedLocation) {
    console.log(`Stored location: ${storedLocation}`);
    try {
      const weatherInfo = await getWeather(storedLocation);
      updateDom(weatherInfo);
    } catch (error) {
      console.error("Error getting weather info from local storage:", error);
    }
  } else {
    console.log("No stored location");
  }

  // Add event listener to search bar
  searchBar.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const location = searchBar.value;
      localStorage.setItem("location", location);
      console.log(`Searched for ${location}`);
      try {
        const weatherInfo = await getWeather(location);
        console.log("weatherInfo", weatherInfo);

        updateDom(weatherInfo);
      } catch (error) {
        console.error("Error getting weather info:", error);
      } finally {
        // Clear the search bar
        searchBar.value = "";
      }
    }
  });
}
