import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./Location.css";
import LocalBullets from "./LocalBullets"; 


import { useState } from "react";
import "./Location.css";

// ✅ Helper: map user input to OSM category
const getQueryByInput = (input) => {
  const value = input.toLowerCase();

  if (value.includes("cafe")) return "cafe";
  if (value.includes("library")) return "library";
  if (value.includes("restaurant")) return "restaurant";

  return "cafe";
};

// ✅ Custom map marker icon
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function Location() {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

  // ✅ Normalize lat/lon for nodes, ways, relations
  const getLatLon = (place) => {
    if (place.lat && place.lon) {
      return [parseFloat(place.lat), parseFloat(place.lon)];
    }

    if (place.center) {
      return [place.center.lat, place.center.lon];
    }

    return null;
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setPlaces([]);
      return;
    }

    const category = getQueryByInput(query);

    // ✅ Bounding box around Boston
    const overpassQuery = `
    [out:json];
    (
      node["amenity"="${category}"](42.23,-71.19,42.40,-70.99);
      way["amenity"="${category}"](42.23,-71.19,42.40,-70.99);
      relation["amenity"="${category}"](42.23,-71.19,42.40,-70.99);
    );
    out center;
    `;

    try {
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: overpassQuery,
      });

      const data = await response.json();
      setPlaces(data.elements || []);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  // ✅ Map center fallback
  const center = places.length
    ? getLatLon(places[0])
    : [42.3601, -71.0589];

  return (





<>

<div className="location-wrapper">

<div className="video-background">
  <video autoPlay loop muted playsInline>
    <source src={`${import.meta.env.BASE_URL}assets/locationbg.mp4`} type="video/mp4" />
  </video>
</div>



    <div className="location-container">
      <h2>Find Cafes, Libraries, and Restaurants </h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search `cafe`, `library`, or `restaurant` Only ! "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>



      {/* ✅ Map */}
      <MapContainer center={center} zoom={13} style={{ height: "400px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {places.map((place) => {
          const position = getLatLon(place);
          if (!position) return null;

          return (
            <Marker key={place.id} position={position} icon={customIcon}>
              <Popup>{place.tags?.name || "Unnamed Place"}</Popup>
            </Marker>
          );
        })}
      </MapContainer>

              {/* ✅ Results list */}
      <div className="results">
        
        {places.map((place) => (
          <div key={place.id} className="card">
            <h3>{place.tags?.name || "Unnamed Place"}</h3>
          </div>
        ))}
      </div>


        


    </div>
    <LocalBullets />
    </div>

    </>
  );
}

export default Location;