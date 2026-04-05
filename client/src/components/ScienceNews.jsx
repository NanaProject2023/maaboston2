import React, { useEffect, useState } from 'react';
import './ScienceNews.css';

function ScienceNews() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const rssURL = 'https://corsproxy.io/?https://feeds.npr.org/1001/rss.xml';
    fetch(rssURL)
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, 'text/xml');
        const items = Array.from(xml.querySelectorAll('item')).map(item => ({
          title: item.querySelector('title').textContent,
          link: item.querySelector('link').textContent,
          pubDate: item.querySelector('pubDate').textContent,
          description: item.querySelector('description').textContent,
        }));
        setItems(items);
      })
      .catch(error => {
        console.error('Error fetching RSS:', error);
      });
  }, []);

  return (
    <div>
      
     <div className="science-news-bullets">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
            <p><em>{item.pubDate}</em></p>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default ScienceNews;