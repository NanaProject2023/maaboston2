import { useState } from "react";
import "./Navbar.css";
import logo from "/assets/celticslogo2.png"; 
import {Link} from "react-router-dom";



function Navbar() {
  const [activeTab, setActiveTab] = useState("news");
  const [search, setSearch] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-logo">
        
          <img src={logo} alt="Logo" />
        
      </div>

      {/* Right: Search */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search Boston..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Center: Tabs */}
      <div className="navbar-tabs">
        
        
   {/*   
        <Link to="/news">Boston News</Link>
        <Link to="/weather">Boston Weather</Link>
        <Link to="/location">Boston Places </Link>
   */}


        

<Link to="/newsboston">
        <button
          className={activeTab === "news" ? "active" : ""}
          onClick={() => handleTabClick("news")}
        >
          Boston News
        </button>
</Link>
<Link to="/weather">
        <button
          className={activeTab === "weather" ? "active" : ""}
          onClick={() => handleTabClick("weather")}
        >
          Boston Weather
        </button>
</Link>
<Link to="/location">
        <button
          className={activeTab === "places" ? "active" : ""}
          onClick={() => handleTabClick("places")}
        >
          Boston Places
        </button>
</Link>
      </div>


    </nav>
  );
}

export default Navbar;