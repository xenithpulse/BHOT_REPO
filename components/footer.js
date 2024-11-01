import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
} from "react-icons/io5";

// Styled component for Footer wrapper
const FooterWrapper = styled.footer`
  width: 100%;
  background: #000;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // Links and text styles
  a, span {
    color: #fff;
    font-size: 0.875rem;
    text-decoration: none;
    margin: 0 10px;
  }

  a:hover {
    text-decoration: underline;
  }

  p {
    color: #fff;
    font-size: 0.75rem;
    margin-top: 20px;
  }

  // Custom styles for social icons
  .social-icons {
    display: flex;
    justify-content: center;
    margin-top: 15px;

    a {
      margin: 0 10px;
      color: inherit; // Icon retains its original color
    }
  }

  // Media queries for responsiveness
  @media (max-width: 768px) {
    a, span {
      font-size: 0.75rem;
      margin: 0 5px;
    }

    p {
      font-size: 0.65rem;
    }

    .social-icons a {
      margin: 0 5px;
    }
  }

  @media (max-width: 480px) {
    a, span {
      font-size: 0.65rem;
    }

    p {
      font-size: 0.6rem;
    }

    .social-icons a {
      margin: 0 5px;
    }
  }
`;

class Footer extends Component {
  render() {
    const current_year = new Date().getFullYear();
    return (
      <FooterWrapper id="section_footer">
        {/* Centered Privacy, Terms, and Contact links */}

        {/* Centered social media icons */}
        <div className="social-icons">
          <Link href="https://www.facebook.com/bhotaala" target="_blank">
            <IoLogoFacebook size={25} style={{ color: '#1877F2' }} />
          </Link>

          <Link href="https://www.instagram.com/bhot.aala" target="_blank">
            <IoLogoInstagram size={25} style={{ color: 'red' }} />
          </Link>

          <Link href="https://wa.link/6bgw18" target="_blank">
            <IoLogoWhatsapp size={25} style={{ color: 'green' }} />
          </Link>

        </div>

        {/* Footer copyright */}
        <p>Copyright © {current_year}, Created By XenithPulse.com</p>
      </FooterWrapper>
    );
  }
}

export default Footer;
