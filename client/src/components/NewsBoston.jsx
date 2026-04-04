import { useEffect, useState } from "react";
import "./NewsBoston.css";

function NewsBoston() {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/latest?apikey=pub_dc2d979120c943198d08dea321008312&q=Boston&country=us&language=en`
        );

        const data = await response.json();
        setNews(data.results || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
<div className="news-container">
  <h2>Boston News</h2>

  {news.length > 0 && (
    <div className="news-viewer">
      
      <div className="news-card-wrapper">
        <div className="news-card">
          {news[currentIndex].image_url && (
            <img src={news[currentIndex].image_url} alt="news" />
          )}

          <h3>{news[currentIndex].title}</h3>
          <p>{news[currentIndex].description}</p>

          <a
            href={news[currentIndex].link}
            target="_blank"
            rel="noreferrer"
          >
            Read full article →
          </a>
        </div>

        {/* BUTTONS OVERLAY */}
        <div className="news-buttons">
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev > 0 ? prev - 1 : news.length - 1
              )
            }
          >
            ⬆️
          </button>

          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % news.length)
            }
          >
            ⬇️
          </button>
        </div>
      </div>

    </div>
  )}
</div>
  );
}

export default NewsBoston;