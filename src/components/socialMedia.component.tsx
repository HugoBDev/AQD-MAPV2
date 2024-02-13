import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faThreads
  } from "@fortawesome/free-brands-svg-icons";
import "../components/socialMedia.scss";


export default function SocialFollow() {
  return (
    <div className="social-container">
      <h3>Social Follow</h3>
      <div className="icon-wrapper">
        <a href="https://www.youtube.com/c/jamesqquick"
        className="instagram social" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="" />
      </a>
      <a href="https://www.facebook.com/learnbuildteach/"
        className="facebook social" target="_blank">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a href="https://www.twitter.com/jamesqquick" className="threads social" target="_blank">
        <FontAwesomeIcon icon={faThreads} size="2x" />
      </a>
      </div>
    </div>
  );
}