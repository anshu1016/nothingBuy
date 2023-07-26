import React from 'react';
import './footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="footerContainer">
      <div className="footerContent">
        <div className="footerLinks">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-condition">Terms of Condition</a>
        </div>
        <div className="footerInfo">
          <p>About Nothing Phone</p>
          <p>Address: 1234 Phone Street, City</p>
          <p>Email: contact@nothingphone.com</p>
        </div>
        <div className="socialLinks">
          <a href="https://facebook.com/nothingphone" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com/nothingphone" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com/nothingphone" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="footerSupport">
          <a href="/support">Support & Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
