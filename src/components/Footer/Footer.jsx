import React from 'react';
import '../Footer/Footer.css';

import Logo from '../../assets/images/Logo.jpg'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return <section className='footer'>
    <div className="container-footer">
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <img src={Logo} alt="" width={230} className='footer-image' />
          <div className='footer-o-text d-block mt-3 mb-3'>Welcome to WoodenCraft - Online Furniture Showrooom</div>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <p className="footer-title">Menu</p>
          <ul className='footer-ul'>
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6">
          <p className="footer-title">Shop By Room</p>
          <ul className="footer-ul">
            <li>Living Room</li>
            <li>Bedroom</li>
            <li>Dining Room</li>
            <li>Kitchen</li>
            <li>Kids Room</li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6">
          <p className="footer-title">Contact</p>
          <ul className="footer-ul">
            <li className='d-flex'>
              <div className="footer-info-i">
                <FaClock />
              </div>
              <span>08:00 - 18:00</span>
            </li>
            <li className='d-flex'>
              <div className="footer-info-i">
                <FaEnvelope />
              </div>
              <span>info@woodencraft.com</span>
            </li>
            <li className='d-flex'>
              <div className="footer-info-i">
                <FaMapMarkerAlt />
              </div>
              <span>Location</span>
            </li>
            <li className='d-flex'>
              <div className="footer-info-i">
                <FaPhoneAlt />
              </div>
              <span>0500 000 00</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
}

export default Footer