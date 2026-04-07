import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faCloudSun,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./Dash.css";


function Dash() {
  const navigate = useNavigate();

  return (

    <div className="wrap-it">
    <div className="dash-container">
      <div className="dash-icon" onClick={() => navigate("/newsboston")}>
        <FontAwesomeIcon icon={faNewspaper} className="icon" />
        <span className="title">Boston News</span>
      </div>

      <div className="dash-icon" onClick={() => navigate("/weather")}>
        <FontAwesomeIcon icon={faCloudSun} className="icon" />
        <span className="title">Boston Weather</span>
      </div>

      <div className="dash-icon" onClick={() => navigate("/location")}>
        <FontAwesomeIcon icon={faSearch} className="icon" />
        <span className="title">Boston Places</span>
      </div>
    </div>
    </div>
  );
}

export default Dash;