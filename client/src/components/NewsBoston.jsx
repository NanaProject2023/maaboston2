

import { useEffect, useState } from "react";
import "./NewsBoston.css";

function NewsBoston() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=Boston&language=en&apiKey=a457b0d08f05483e83c68725d811aeb5`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          console.error("API Error:", data.message);
          setArticles([]);
          return;
        }

        setArticles(data.articles || []);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setArticles([]);
      });
  }, []);

  return (
    <div>
      {articles.map((article, index) => (
        <div key={index} className="news-card">
          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} />
          )}

          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsBoston;