import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { useState } from "react";

const CarouselWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  overflow: hidden; /* Ensure overflow doesn't break layout */
`;

const ThumbnailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 120px; /* Adjust size for larger screens */
  flex-shrink: 0; /* Prevent shrinking */
  position: relative;

  @media (max-width: 768px) {
    max-width: 80px; /* Reduce size for smaller screens */
    flex-shrink: 1;
  }
`;

const ThumbnailImage = styled.img`
  width: 70px;
  cursor: pointer;
  border-radius: 8px;
  border: ${({ isActive }) => (isActive ? "2px solid black" : "2px solid transparent")};
  transition: border 0.3s ease;

  &:hover {
    border: 3px solid black; /* Hover effect */
  }

  @media (max-width: 768px) {
    width: 35px; /* Reduce thumbnail size for smaller screens */
  }
`;

const MainImageWrapper = styled.div`
  flex: 1;
  position: relative;

  @media (max-width: 768px) {
    /* Adjust width to fit smaller screens */
    width: calc(100% - 80px); /* Subtracting the width of thumbnails */
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
`;

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle when a thumbnail is clicked
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  // Handle when the main carousel changes slides
  const handleCarouselChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselWrapper>
      {/* Thumbnails Section */}
      <ThumbnailsWrapper>
        {images.map((image, index) => (
          <ThumbnailImage
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            isActive={index === currentIndex}
            onClick={() => handleThumbnailClick(index)}  // Clicking thumbnail
          />
        ))}
      </ThumbnailsWrapper>

      {/* Main Image Carousel */}
      <MainImageWrapper>
        <Carousel
          showThumbs={false}  // Hide the default carousel thumbs
          infiniteLoop
          selectedItem={currentIndex}  // Sync with current index
          onChange={handleCarouselChange}  // Update index when carousel changes
          useKeyboardArrows
          autoPlay
          stopOnHover
          dynamicHeight={false}
          showStatus={false}
          showIndicators={false}
        >
          {images.map((image, index) => (
            <div key={index}>
              <MainImage src={image} alt={`Product Image ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </MainImageWrapper>
    </CarouselWrapper>
  );
};

export default ImageCarousel;
