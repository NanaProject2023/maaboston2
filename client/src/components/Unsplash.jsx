import { useEffect, useState } from "react";
import "./Unsplash.css";

function Unsplash() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const ACCESS_KEY = "go6OK1P3Su3N9XflJmGRWPcmZuo2Y8E83-AV8FuPSRw";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=Boston&per_page=10&client_id=${ACCESS_KEY}`
        );
        const data = await res.json();

        setImages(data.results || []);
      } catch (err) {
        console.error("Error fetching Unsplash images:", err);
      }
    };

    fetchImages();
  }, []);

  // ⏱️ Rotate every 5 seconds
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return <p>Loading images...</p>;
  }

  const currentImage = images[currentIndex];

  return (
    <div className="unsplash-container">
      <img
        src={currentImage.urls.regular}
        alt={currentImage.alt_description || "Boston"}
        className="unsplash-image"
      />
    </div>
  );
}

export default Unsplash;