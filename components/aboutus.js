import React from 'react';
import styled from 'styled-components';

// Styled components for the About section
const AboutSection = styled.section`
  position: relative; // Set position for the overlay
  width: 100%;
  padding: 50px 20px;
  background-color: #000; // Fallback color
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 1px;

  // Background image
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("https://res.cloudinary.com/dcsk6j16i/image/upload/v1729856565/dmwmsj4vaeoxg2taw4kv.jpg"); // Your image here
    background-size: cover; // Ensure it covers the section
    background-position: center; // Center the image
    opacity: 0.3; // Dim the background
    z-index: 0; // Position behind the content
  }

  // Flexbox container to handle layout
  .about-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
    position: relative; // Positioning context for z-index
    z-index: 1; // Ensure content is above the background

    opacity: 0;
    transform: translateY(20px);
    animation: fadeIn 1.5s ease-out forwards; // Apply the animation

    @media (max-width: 768px) {
      gap: -15px;
    }
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // About text section
  .about-text {
    flex: 1;
    padding-right: 20px;
    text-align: center; // Center text

    h2 {
      font-size: 2rem;
      color: #fff;
      margin-bottom: 20px;
    }

    p {
      font-size: 1.5rem;
      color: #fff;
      line-height: 1.5;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInText 1.5s ease-out 0.5s forwards; // Delay for text

      @media (max-width: 768px) {
        font-size: 0.9rem;
      }
    }
  }

  @keyframes fadeInText {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Image section
  .about-image {
    flex: 1;
    padding-left: 20px;
    padding-top: 105px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInImage 1.5s ease-out 1s forwards; // Delay for image

    img {
      width: 100%;
      height: auto;
      border-radius: 10px;
    }
  }

  @keyframes fadeInImage {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Media queries for responsiveness
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0px 0px;
    .about-container {
      flex-direction: column;
    }

    .about-text {
      text-align: center;
      padding-left: 15px;
    }

    .about-image {
      padding-left: 0;
    }
  }
`;

const AboutUs = () => {
  return (
    <AboutSection id='about-us'>
      <div className="about-container">
        {/* Left side with text */}
        <div className="about-text">
          <h2>About Us</h2>
          <p>
          Aladdin-Decor is your premier destination for exquisite metal wall art and clocks in Pakistan.
          We are passionate about transforming your living spaces with captivating designs that blend artistry and functionality.
          </p>
          <p>
          Our collection showcases a diverse range of handcrafted pieces,
          each meticulously crafted to bring a touch of elegance and sophistication to your home or office.
          </p>
        </div>
      </div>
    </AboutSection>
  );
};

export default AboutUs;

