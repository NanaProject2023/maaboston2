import { useEffect, useState } from "react";
import "./YoutubeWeather.css";

function YoutubeWeather() {
  const [videos, setVideos] = useState([]);

  const API_KEY = "AIzaSyAKvZaALlGnNy_0bRtoHmfVqh3S9k4Lfg8";

  useEffect(() => {
    fetchVideos();
  }, []);

  function fetchVideos() {
    const query = "Boston weather forecast";

    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=6&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.items);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="yt-container">
      <div className="yt-grid">
        {videos.map((video) => (
          <div className="yt-card" key={video.id.videoId}>
            <iframe
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              allowFullScreen
            ></iframe>

            <p>{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YoutubeWeather;