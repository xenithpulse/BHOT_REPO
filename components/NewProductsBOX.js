import styled from 'styled-components';
import { useRouter } from 'next/router';

const ProductBoxContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: border 0.3s ease, transform 0.3s ease;

  // Default size for larger screens
  width: 500px;
  height: 300px;

  &:hover {
    border: 1px solid black;
    transform: scale(1.05);
  }

  // Adjust size for small screens
  @media (max-width: 768px) {
    width: 250px;
    height: 190px;
  }
`;


const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 100%;
`;

const TitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 5px;
`;


const PriceContainer = styled.div`
  width: 87px;
  height: 32px;
  background: black;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;

  @media (max-width: 768px) {
    width: 70px;
    height: 26px;
  }
`;

const Price = styled.span`
  font-size: 14px;
  color: white;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const DiscountedPercentage = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: green;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const ProductBox = ({ product }) => {
  const router = useRouter();
  const handleImageClick = () => {
    router.push(`/product/${product._id}`);
  };

  return (
    <ProductBoxContainer>
      <ProductImage src={product.images[0]} alt={product.title} onClick={handleImageClick} />
      {product.discounted_percentage > 0 && (
      <DiscountedPercentage>{product.discounted_percentage}% off</DiscountedPercentage>)}
      <TitleContainer>
        <PriceContainer>
          <Price><strong>PKR {product.price}</strong></Price>
        </PriceContainer>
      </TitleContainer>
    </ProductBoxContainer>
  );
};

export default ProductBox;
