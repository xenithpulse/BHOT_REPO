import styled from 'styled-components';
import NavLink from 'next/link';
import Center from "@/homecenter";
import Title from './Title';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loader from './Loader';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Styled components
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr); 
  gap: 10px;
  margin-left: 0px;
  margin-right: 10px;
  box-shadow: 0;
  transform: scale(1);
  transition: box-shadow 0.3s, transform 0.3s ease-in-out;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); 
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); 
  }

  width: 100%;
  box-sizing: border-box;
`;

const CategoryBox = styled(NavLink)`
  display: block;
  width: 100%;
  height: 300px;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0;
  transform: scale(1);
  transition: box-shadow 0.3s, transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.02);
    box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CategoryImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1; 
`;

const CategoryTitle = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: bold;
  position: relative; 
  z-index: 2; 
`;

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Check screen size on mount and on resize
  useEffect(() => {
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const categories = [
    { href: "/wallclocks", image: "https://aladdin-bucket0.s3.amazonaws.com/1726578159242.png", title: "Home Decor" },
    { href: "/Wallart", image: "https://aladdin-bucket0.s3.amazonaws.com/1728368843559.webp", title: "Kitchen" },
    { href: "/homedecor", image: "https://aladdin-bucket0.s3.amazonaws.com/1728379139002.webp", title: "Bathroom" },
    { href: "/homedecor", image: "https://aladdin-bucket0.s3.amazonaws.com/1728379139002.webp", title: "Organizer" },
  ];

  return (
    <Center>
      {loading && <Loader />}
      <Title>Categories</Title>
      {isSmallScreen ? (
        <Carousel
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={4000}
        >
          {categories.map((category, idx) => (
            <CategoryBox key={idx} href={category.href} passHref>
              <CategoryImage image={category.image}>
                <Overlay />
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryImage>
            </CategoryBox>
          ))}
        </Carousel>
      ) : (
        <CategoryGrid>
          {categories.map((category, idx) => (
            <CategoryBox key={idx} href={category.href} passHref>
              <CategoryImage image={category.image}>
                <Overlay />
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryImage>
            </CategoryBox>
          ))}
        </CategoryGrid>
      )}
    </Center>
  );
}
