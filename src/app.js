import getWeather from "./api";

export default async function initApp() {
  const searchBar = document.getElementById("search-bar");
  const resultsContainer = document.querySelector(".results-container");

  searchBar.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const location = searchBar.value;
      console.log(`Searched for ${location}`);
      const weatherInfo = await getWeather(location);
      console.log("weatherInfo", weatherInfo);

      // Update the DOM with the weather results
      resultsContainer.innerHTML = `
        <h2>Weather in ${weatherInfo.location}</h2>
        <p>Temperature: ${weatherInfo.tempurature} C</p>
        <p>Feels like: ${weatherInfo.feelsLike} C</p>
        <p>Humidity: ${weatherInfo.humidity}%</p>
        <p>Wind speed: ${weatherInfo.wind} m/s</p>
        <p>Visibility: ${weatherInfo.visibility} meters</p>
        <!-- Add more weather information here -->
      `;

      // Clear the search bar
      searchBar.value = "";
    }
  });
}
