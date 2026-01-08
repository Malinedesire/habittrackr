import { Link } from "react-router-dom";
import "./PublicFooter.css";
import Logo from "../../assets/logo.svg"; // justera path vid behov

const PublicFooter = () => {
  return (
    <footer className="publicFooter">
      <div className="footerTop">
        <div className="footerBrand">
          <div className="footerLogo">
            <img src={Logo} alt="HabitTrackr logo" className="footerLogoIcon" />
            <strong>HabitTrackr</strong>
          </div>

          <p className="footerTagline">
            Building better habits, one day at a time.
          </p>
        </div>

        <div className="footerLinks">
          <div>
            <h4>Product</h4>
            <Link to="/">Features</Link>
            <Link to="/">How it works</Link>
            <Link to="/register">Get started</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link to="/">About</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Contact</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link to="/">Privacy</Link>
            <Link to="/">Terms</Link>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <span>© 2025 HabitTrackr. All rights reserved.</span>

        <div className="footerSocials">
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
