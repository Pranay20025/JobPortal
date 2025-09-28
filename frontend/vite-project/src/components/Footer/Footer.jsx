import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-container">
        <div className="footer-left">
        <h3>About Us</h3>
        <p>Our company is a leading provider of innovative solutions.</p>
        </div>
        <div className="footer-center">
        <h3>Quick Links</h3>
         <p>Home</p>
         <p>Jobs</p>
         <p>Browse</p>
         <p>Contact us</p>
        </div>
        <div className="footer-right">
        <h3>Contact Us</h3>
         <p>Phone: 123-456-7890</p>
         <p>Email: saxenapranay2504@gmail.com</p>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2023 Pranay Saxena. All rights reserved.</p>
      </div>
    
    </div>
  )
}

export default Footer