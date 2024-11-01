import { useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import Image from "next/image";

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  cursor: none;
  margin-top: 64px;

  @media (max-width: 1024px) {
    margin-top: 64px;
  }
  @media (max-width: 768px) {
    margin-top: 64px;
  }
  @media (max-width: 640px) {
    margin-top: 64px;
  }
`;

const CarouselImage = styled.div`
  width: 100%;
  height: auto;
`;

const CustomCursor = styled.div`
  position: absolute;
  width: 3vmax;
  height: 3vmax;
  border: 2px solid transparent;
  background-color: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: 0.1s;
  z-index: 120;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  width: 12px; /* Adjusted size for the indicator loader */
  aspect-ratio: 1;
  border: 6px solid green;
  border-radius: 50%;
  position: relative;
  margin: 0 auto; /* Center loader in indicator */
  animation: l18 3s infinite linear; /* Sync with interval time */

  &::before {
    content: "";
    position: absolute;
    inset: -5px; /* Adjusted to fit */
    border-radius: 50%;
    animation: l18 3s infinite linear; /* Match the loader duration */
  }

  @keyframes l18 {
    0% {
      clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0);
    }
    25% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
    }
    50% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
    }
    75% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
    }
    100% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
    }
  }
`;

const IndicatorContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 100;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.active ? "white" : "white")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: relative;
`;

const NextJsCarousel = () => {
  const carouselRef = useRef(null);
  const cursorRef = useRef(null);
  const [cursorDirection, setCursorDirection] = useState("right");
  const [cursorHide, setCursorHide] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Track active index for indicators

  const images = [
    "/2_3.webp",
    "/8_2000x.webp",
    "/9_2000x.webp",
  ];

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.pageX}px`;
        cursorRef.current.style.top = `${e.pageY}px`;

        const pageWidth = window.innerWidth;
        if (e.pageX < pageWidth / 2) {
          setCursorDirection("left");
        } else {
          setCursorDirection("right");
        }
      }
    };

    const page = document.getElementById("carousel-page");
    if (page) {
      page.addEventListener("mousemove", moveCursor);
      page.addEventListener("mouseenter", () => {
        cursorRef.current.style.scale = 1;
      });
      page.addEventListener("mouseleave", () => {
        cursorRef.current.style.scale = 0;
      });
    }

    return () => {
      if (page) {
        page.removeEventListener("mousemove", moveCursor);
      }
    };
  }, []);

  const handleImageError = (e) => {
    console.error("Image failed to load:", e.target.src);
  };

  const handleClick = () => {
    if (carouselRef.current) {
      const { selectedItem } = carouselRef.current.state;
      const newIndex =
        cursorDirection === "right" ? selectedItem + 1 : selectedItem - 1;
      setActiveIndex(newIndex >= images.length ? 0 : newIndex < 0 ? images.length - 1 : newIndex); // Update active index
      carouselRef.current.moveTo(newIndex >= images.length ? 0 : newIndex < 0 ? images.length - 1 : newIndex);
    }
  };

  const handleImageChange = (index) => {
    setActiveIndex(index); // Update active index when the image changes
  };

  return (
    <CarouselContainer id="carousel-page" onClick={handleClick}>
      <CustomCursor ref={cursorRef} className={cursorHide ? "opacity-0" : ""}>
        {cursorDirection === "right" ? (
          <svg
            role="presentation"
            focusable="false"
            width="30%"
            height="30%"
            className="icon icon-chevron-right-small reverse-icon"
            viewBox="0 0 5 8"
          >
            <path
              d="m.75 7 3-3-3-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            ></path>
          </svg>
        ) : (
          <svg
            role="presentation"
            focusable="false"
            width="30%"
            height="30%"
            className="icon icon-chevron-left-small"
            viewBox="0 0 5 8"
          >
            <path
              d="M4.25 7L1.25 4l3-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            ></path>
          </svg>
        )}
      </CustomCursor>
      <Carousel
        ref={carouselRef}
        autoPlay
        infiniteLoop
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        stopOnHover={false}
        showIndicators={false}
        interval={3000}
        onError={handleImageError}
        onChange={handleImageChange} // Triggered on image change
      >
        {images.map((src, idx) => (
          <CarouselImage key={idx}>
            <Image
              src={src}
              alt={`Home Image ${idx + 1}`}
              width={2000}
              height={750}
              layout="responsive"
              objectFit="cover"
              onError={handleImageError}
            />
          </CarouselImage>
        ))}
      </Carousel>
      <IndicatorContainer>
        {images.map((_, idx) => (
          <Indicator key={idx} active={activeIndex === idx}>
            {activeIndex === idx && <Loader />} {/* Show loader for the active index */}
          </Indicator>
        ))}
      </IndicatorContainer>
    </CarouselContainer>
  );
};

export default NextJsCarousel;
