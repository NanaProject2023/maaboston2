import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright, faRegistered, faTrademark } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Left: Social Icons */}
      <div className="footer-left">
        <FontAwesomeIcon icon={faXTwitter} />
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faLinkedin} />
      </div>

      {/* Center: Name + Brand */}
      <div className="footer-center">
        <p>
          <FontAwesomeIcon icon={faCopyright} /> {currentYear} MaaBoston. All rights reserved.  
        </p>
      </div>
    </footer>
  );
}

export default Footer;