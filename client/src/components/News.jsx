import { useEffect, useState } from "react";
import "./News.css";
import NewsCard from "./NewsCard";

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/latest?apikey=pub_dc2d979120c943198d08dea321008312&q=Boston&country=us&language=en`
        );

        const data = await response.json();
        setArticles(data.results || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);


  return (

  <div className="news-container">

    {articles.length > 0 && (
      <div className="news-viewer">

        <div className="news-card-wrapper">
          <div className="news-card">

            {articles[currentIndex].image_url && (
              <img src={articles[currentIndex].image_url} alt="news" />
            )}

            <h3>{articles[currentIndex].title}</h3>
            <p>{articles[currentIndex].description}</p>

            <a
              href={articles[currentIndex].link}
              target="_blank"
              rel="noreferrer"
            >
              Read full article →
            </a>
          </div>

          <div className="news-buttons">
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev > 0 ? prev - 1 : articles.length - 1
                )
              }
            >
              ⬆️
            </button>

            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % articles.length)
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
export default News;