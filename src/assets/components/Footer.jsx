import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">Copyright &copy; 2025 Peterdraw</p>
      <div className="footer__links">
        <a className="footer__link">Privacy Policy</a>
        <a className="footer__link">Terms and Conditions</a>
        <a className="footer__link">Contact</a>
      </div>
      <div className="footer__social">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-item"
        >
          <img
            src="/icons/FacebookLogo.svg"
            alt="Facebook"
            className="footer__social-icon"
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-item"
        >
          <img
            src="/icons/InstagramLogo.svg"
            alt="Instagram"
            className="footer__social-icon"
          />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-item"
        >
          <img
            src="/icons/XTwitterLogo.svg"
            alt="Twitter"
            className="footer__social-icon"
          />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-item"
        >
          <img
            src="/icons/YoutubeLogo.svg"
            alt="YouTube"
            className="footer__social-icon"
          />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-item"
        >
          <img
            src="/icons/LinkedinLogo.svg"
            alt="LinkedIn"
            className="footer__social-icon"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
