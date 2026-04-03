import { useEffect, useState } from "react";
import "./News.css";
import NewsCard from "./NewsCard";

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(
        //general news api call
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=a457b0d08f05483e83c68725d811aeb5`
    )
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => console.error(err));
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

export default News;