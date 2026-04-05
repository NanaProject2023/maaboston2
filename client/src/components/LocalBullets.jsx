import { useEffect, useState } from "react";
import "./LocalBullets.css"

function LocalBullets() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/rss?url=https://feeds.npr.org/1001/rss.xml"
        );

        const text = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const rssItems = Array.from(xml.querySelectorAll("item")).map((item) => ({
          title: item.querySelector("title")?.textContent,
          link: item.querySelector("link")?.textContent,
          pubDate: item.querySelector("pubDate")?.textContent,
          description: item.querySelector("description")?.textContent,
        }));

        setItems(rssItems.slice(0, 10)); // limit to 10
      } catch (error) {
        console.error("Error fetching RSS:", error);
      }
    };

    fetchRSS();
  }, []);

  return (
    <div>
      <div className="science-news-bullets">
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              <p><em>{item.pubDate}</em></p>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LocalBullets;