import { useEffect, useState } from "react";
import "./WeatherBullets.css";

function WeatherBullets() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch(
          "https://corsproxy.io/?https://artsboston.org/feed/"
        );
        const text = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");

        const entries = Array.from(xml.querySelectorAll("item")).map((item) => ({
          title: item.querySelector("title")?.textContent,
          link: item.querySelector("link")?.textContent,
        }));

        setItems(entries);
      } catch (error) {
        console.error("Error fetching RSS:", error);
      }
    };

    fetchRSS();
  }, []);

  // Auto-loop every 3 seconds
  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items]);

  return (
   
    <div className="weather-bullets">
      {items.length > 0 && (
        <a
          href={items[currentIndex].link}
          target="_blank"
          rel="noopener noreferrer"
          className="bullet-link"
        >
          {items[currentIndex].title}
        </a>
      )}

      <div className="dots">
        {items.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default WeatherBullets;