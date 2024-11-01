import Header from "@/components/Header";
import Center from "@/homecenter";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/homepagegrid";
import Title from "@/components/Title";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Category } from "@/models/Category";

export default function ProductsPage({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceSort, setPriceSort] = useState("");
  const [dateSort, setDateSort] = useState("");

  const handlePriceSort = (e) => {
    const value = e.target.value;
    setPriceSort(value);

    const sortedProducts = [...products].sort((a, b) => {
      if (value === "low-to-high") return a.price - b.price;
      if (value === "high-to-low") return b.price - a.price;
      return 0;
    });
    setFilteredProducts(sortedProducts);
  };

  const handleDateSort = (e) => {
    const value = e.target.value;
    setDateSort(value);

    const sortedProducts = [...products].sort((a, b) => {
      if (value === "new-to-old") return new Date(b.createdAt) - new Date(a.createdAt);
      if (value === "old-to-new") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });
    setFilteredProducts(sortedProducts);
  };

  return (
    <>
      <Header />
      <Center>
        <SortHeader>
          <Title>Explore All Products</Title>
          <SortControls>
            <DropdownContainer>
              <DropdownLabel>Price:</DropdownLabel>
              <StyledDropdown value={priceSort} onChange={handlePriceSort}>
                <option value="">Select</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </StyledDropdown>
            </DropdownContainer>

            <DropdownContainer>
              <DropdownLabel>Date:</DropdownLabel>
              <StyledDropdown value={dateSort} onChange={handleDateSort}>
                <option value="">Select</option>
                <option value="new-to-old">New to Old</option>
                <option value="old-to-new">Old to New</option>
              </StyledDropdown>
            </DropdownContainer>
          </SortControls>
        </SortHeader>
        <ProductsGrid products={filteredProducts} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const products = await Product.find({}, null, { sort: { _id: 1 } }).populate("category");

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const SortHeader = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0px;
  animation: ${fadeIn} 0.5s ease-in-out;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0px;
    gap: 15px;
  }
`;


const SortControls = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }

  @media (max-width: 480px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const DropdownLabel = styled.span`
  font-size: 0.85rem;
  color: #555;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const StyledDropdown = styled.select`
  padding: 6px 10px;
  font-size: 0.85rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f7f7f7;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    background-color: #eaeaea;
    border-color: #bbb;
  }

  &:focus {
    border-color: #333;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 5px 8px;
    width: 100%;
  }
`;
