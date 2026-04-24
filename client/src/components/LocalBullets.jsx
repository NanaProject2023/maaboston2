
/*
import { useEffect, useState } from "react";
import "./LocalBullets.css";

function LocalBullets() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch("https://corsproxy.io/?https://www.boston.com/tag/events/feed/");
        const text = await response.text(); // ✅ XML comes as text

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const itemsArray = Array.from(xml.querySelectorAll("item")).map(
          (item) => ({
            title: item.querySelector("title")?.textContent,
            link: item.querySelector("link")?.textContent,
            pubDate: item.querySelector("pubDate")?.textContent,
            description: item.querySelector("description")?.textContent,
          })
        );

        setItems(itemsArray);
      } catch (error) {
        console.error("Error fetching RSS:", error);
      }
    };

    fetchRSS();
  }, []);

  return (
    <div className="rss-container">
      <h2>Boston / News Updates</h2>

      {items.length === 0 ? (
        <p>Loading news...</p>
      ) : (
        items.map((item, index) => (
          <div key={index} className="rss-card">
            <h3>{item.title}</h3>
            <p>{item.pubDate}</p>

            <p
              dangerouslySetInnerHTML={{
                __html: item.description || "",
              }}
            />

            <a href={item.link} target="_blank" rel="noreferrer">
              Read more
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default LocalBullets; 
*/

import { useEffect, useState } from "react";
import "./LocalBullets.css";

function LocalBullets() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch(
          `/api/localbullets`
        );
        const text = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const itemsArray = Array.from(xml.querySelectorAll("item")).map(
          (item) => ({
            title: item.querySelector("title")?.textContent,
            link: item.querySelector("link")?.textContent,
            pubDate: item.querySelector("pubDate")?.textContent,
            description: item.querySelector("description")?.textContent,
          })
        );

        setItems(itemsArray);
      } catch (error) {
        console.error("Error fetching RSS:", error);
      }
    };

    fetchRSS();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? items.length - 1 : prev - 1
    );
  };

  if (items.length === 0) return <p>Loading news...</p>;

  const item = items[currentIndex];

  return (
    <div className="rss-wrapper">
     

      <div className="rss-carousel">
        <button className="nav-btn" onClick={handlePrev}>
          ⬅️
        </button>

        <div className="rss-card">
          <h3>{item.title}</h3>
          <p className="date" id="date">{item.pubDate}</p>

          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: item.description || "",
            }}
          />

          <a href={item.link} target="_blank" rel="noreferrer">
            Read more
          </a>
        </div>

        <button className="nav-btn" onClick={handleNext}>
          ➡️
        </button>
      </div>
    </div>
  );
}

export default LocalBullets;