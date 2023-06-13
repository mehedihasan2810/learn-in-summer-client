import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "/assets/logo2-removebg-preview.png";
import { motion } from "framer-motion";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
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
              {/* <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              minus dolore tempora beatae modi sequi eligendi delectus, ea sed
              voluptate itaque similique quos doloremque quam aut numquam
              maxime. Officiis, atque.
            </span> */}
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
            {/* <div className="right">
        <img src="./images/payment-gateway.png" alt="payment gateway" />
      </div> */}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
