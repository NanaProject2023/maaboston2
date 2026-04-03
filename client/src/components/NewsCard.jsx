import "./NewsCard.css";

function NewsCard({ article }) {
  return (
    <div className="news-card">
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} />
      )}

      <div className="news-content">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
      </div>
    </div>
  );
}

export default NewsCard;