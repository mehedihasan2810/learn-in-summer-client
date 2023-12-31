import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "/assets/logo2-removebg-preview.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
        <div className="center-container">
          <div className="top">
            <div className="item">
              <h1>Classes</h1>
              <span>Piano Lesson</span>
              <span>Guiter Lesson</span>
              <span>Violin Lesson</span>
              <span>Drum Lesson</span>
              <span>Best Rated</span>
            </div>
            <div className="item">
              <h1>Links</h1>
              <span>FAQ</span>
              <span>Pages</span>
              <span>Stories</span>
              <span>Compare</span>
              <span>Cookies</span>
            </div>
            <div className="item">
              <h1>About</h1>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                enim eos vitae blanditiis neque molestias itaque sequi,
                voluptatem voluptatum, error placeat magni? Rerum mollitia
                dignissimos quo magnam culpa quasi maiores.
              </span>
            </div>
            <div className="item">
              <h1>Contact</h1>
              <p>Phone: O172*******</p>
              <p>12 Avenue, Dhaka, Bangladesh</p>
              <div className="social">
                <FaFacebook />
                <FaInstagram />
                <FaLinkedin />
                <FaTwitter />
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <img src={logo} alt="" />
              <span className="logo">LearnInSummer</span>
              <span className="copyright">
                Copyright 2023. All Rights Reserved
              </span>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
