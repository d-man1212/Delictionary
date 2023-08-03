import logo from "/assets/logo.png";
import edamam from "/assets/Edamam_Badge_Transparent.svg";
import instagramIcon from "/assets/insta.svg";
import githubIcon from "/assets/github.svg";
import linkedinIcon from "/assets/linkedin.svg";
import { useNavigate } from "react-router-dom";
import urlConfig from "../../url.config";

export default function Footer() {
  const navigate = useNavigate();
  console.log(urlConfig);
  return (
    <div className="footer">
      <div className="footer-social">
        <p>Follow us</p>
        <div className="social-icons">
          <a
            href={urlConfig.instaURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="instagram-icon">
              <img src={instagramIcon} alt="Instagram" />
            </div>
          </a>
          <a
            href={urlConfig.githubURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="github-icon">
              <img src={githubIcon} alt="Github" />
            </div>
          </a>
          <a
            href={urlConfig.linkedinURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="linkedin-icon">
              <img src={linkedinIcon} alt="LinkedIn" />
            </div>
          </a>
        </div>
      </div>
      <div className="footer-disclaimer">
        <p>&copy; 2023 Delictionary</p>
        <p>All rights reserved</p>
      </div>

      <div className="footer-right">
        <div onClick={() => navigate("/")} className="logo">
          <img src={logo} alt="Logo" />
          Delictionary
        </div>
        <div className="footer-api">
          <img src={edamam} alt="Powered by Edamam" />
        </div>
      </div>
    </div>
  );
}
