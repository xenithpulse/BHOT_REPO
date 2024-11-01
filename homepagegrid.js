import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two columns for small devices */
  gap: 10px; /* Space between grid items */
  margin-left: -13px; /* Ensure consistent margin on both sides */
  margin-right: 10px;

  /* Tablet and larger screens: Three columns layout */
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr; /* Three columns for tablets */
  }

  /* Larger screens: Four columns layout */
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr; /* Four columns for large devices */
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