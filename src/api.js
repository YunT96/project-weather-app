// Current weather api
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Singapore/today?unitGroup=metric&include=current&key=HW4Z87ERXJ4UUMTZX2XCA84MS&contentType=json

async function getWeather(location) {
  if (!location.trim()) {
    alert("Invalid location");
    return null;
  }
  try {
    const response = await fetch(
      // "https://jsonplaceholder.typicode.com/todos/1",
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&include=current&key=HW4Z87ERXJ4UUMTZX2XCA84MS&contentType=json`,
    );
    const data = await response.json();
    console.log(data);

    const weatherInfo = {
      location: data.address,
      conditions: data.currentConditions.conditions,
      tempurature: data.currentConditions.temp,
      feelsLike: data.currentConditions.feelslike,
      humidity: data.currentConditions.humidity,
      wind: data.currentConditions.windspeed,
      visibility: data.currentConditions.visibility,
    };
    return weatherInfo;
  } catch (error) {
    alert(`Invalid location ${error}`);
    return null;
  }
}

export default getWeather;
