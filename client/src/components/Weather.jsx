
import {useState, useEffect} from "react";
import "./Weather.css";



function Weather() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  function getWeather() {

    
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=42.36&longitude=-71.06&current_weather=true";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        
        const MT = data.current_weather.temperature;
        const WS = data.current_weather.windspeed;
        const T = data.current_weather.time;

        const weather = {
          location: "Weather in Boston",
          temperature: `Temperature: ${MT} °C`,
          windspeed: `Wind Speed: ${WS} km/h`,
          time: `Latest Update:  ${new Date(T).toLocaleTimeString("en-US",{
            timeZone: "America/New_York"
          })}`
        };

        setWeatherInfo(weather);
      })
      .catch((error) => console.error(error));
  }

  // ✅ runs once when app loads
  useEffect(() => {
    getWeather();
  }, []);

return (
  <div className="weather-container">

    <button className="weather-btn" onClick={getWeather}>
      Refresh Weather
    </button>

    {weatherInfo && (
      <div className="weather-info">
        <h2 className="weather-title">{weatherInfo.location}</h2>
        <p>{weatherInfo.temperature}</p>
        <p>{weatherInfo.windspeed}</p>
        <p>{weatherInfo.time}</p>
      </div>
    )}
  </div>
);
}
export default Weather;
