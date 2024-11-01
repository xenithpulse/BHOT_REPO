import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two columns layout for mobile devices */
  gap: 20px; /* Space between grid items */
  
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr; /* Three columns layout for tablets and larger screens */
  }
  
  /* Optional: Ensures grid items don't exceed their container width */
  width: 100%;
  box-sizing: border-box; 
`;


export default function ProductsGrid({products}) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 && products.map(product => (
        <ProductBox key={product._id} {...product} />
      ))}
    </StyledProductsGrid>
  );
}