import React from 'react';
import styled from 'styled-components';
import ProductBox from './NewProductsBOX'; // Adjust the import based on your file structure
import Center from '@/homecenter';
import Title from './Title';

const SlideContainer = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
`;

const ProductTrack = styled.div`
  display: flex;
  gap: 16px; // Add gap between product boxes
  width: calc(100% * 3); // Width to accommodate 3 sets of products for seamless looping
  animation: slide 40s linear infinite; // Adjust duration for speed

  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-33.33%); // Move left by one-third of the total width
    }
  }

  @media (max-width: 768px) {
    width: calc(100% * 7); // Adjust width for smaller screens
  }
`;

const StyledProductBox = styled(ProductBox)`
  flex: 0 0 auto;
  width: calc(100% / 3); // Display 3 items at once on larger screens

  @media (max-width: 768px) {
    width: calc(100% / 1); // Display 1.5 items on small screens
  }
`;

const ProductSlide = ({ products }) => {
  return (
    <SlideContainer>
        <Center>
          <Title style={{marginBottom:"-20px"}}>New Arrivals</Title>  
        </Center>
      <ProductTrack>
        {products.concat(products).map((product) => ( // Duplicate products for seamless looping
          <StyledProductBox key={product.id} product={product} /> // Adjust 'id' based on your product structure
        ))}
      </ProductTrack>
    </SlideContainer>
  );
};

export default ProductSlide;
