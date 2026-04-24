import { useEffect, useState } from "react";
import "./WeatherExtra.css";

function WeatherExtra() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
         '/api/weather'
        );

        

        console.log("STATUS:", response.status);

        if (!response.ok) throw new Error("Weather RSS failed");

        const text = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");
/*
        const entries = Array.from(xml.querySelectorAll("item")).map((item) => ({
          title: item.querySelector("title")?.textContent,
          description: item.querySelector("description")?.textContent,
        }));
*/


const entries = Array.from(xml.querySelectorAll("item")).map((item) => {
  const rawDescription = item.querySelector("description")?.textContent;

  // Extract image URL
  const imgMatch = rawDescription.match(/<img[^>]+src="([^">]+)"/);
  const image = imgMatch ? imgMatch[1] : null;

  // Clean text (remove HTML)
  const cleanText = rawDescription.replace(/<[^>]+>/g, "");

  return {
    title: item.querySelector("title")?.textContent,
    description: cleanText,
    image,
  };
});


        setItems(entries);
      } catch (error) {
        console.error("Weather fetch error:", error);
      }
    };

    fetchWeather();
  }, []);

  // Auto-loop every 3 seconds
  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="weather-extra">
      {items.length === 0 && <p>Loading weather...</p>}

      {items.length > 0 && (
        <>
{/* //image is horrible
    {items[currentIndex].image && (
      <img
        src={items[currentIndex].image}
        alt="weather icon"
        className="weather-icon"
      />
    )}
*/}


          <h4>{items[currentIndex].title}</h4>
          <p>{items[currentIndex].description}</p>
        </>
      )}
    </div>
  );
}

export default WeatherExtra;