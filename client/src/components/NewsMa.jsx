import { useEffect, useState } from "react";
import "./NewsMa.css";
import NewsCard from "./NewsCard";

function NewsMa
() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(
     `https://newsapi.org/v2/everything?q=Massachusetts&language=en&apiKey=a457b0d08f05483e83c68725d811aeb5`
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

export default NewsMa;