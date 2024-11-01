import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { CartContext } from "@/components/CartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

const ProductWrapper = styled.div`
  position: relative;
  width: 100%; /* Each product wrapper will take 35% of the row width */
  height: 450px;
  aspect-ratio: 3 / 4;
  background: white;
  overflow: hidden;
  box-shadow: 0;
  transform: scale(1);
  transition: box-shadow 0.3s, transform 0.3s ease-in-out;
  margin: 0 5px; /* Adds a margin of 10px on the left and right to ensure equal spacing */

  &:hover {
    transform: scale(1.02);
    box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.2);
  }

  /* Adjust layout on small screens */
  @media (max-width: 768px) {
    width: 350px; /* Ensuring that two product wrappers fit in a row */
    margin: 18px; /* Same left-right margin on small screens */
    height: 280px;
  }

  @media (max-width: 480px) {
    width: 100%; /* Keeps two products in a row for small devices */
    height: 250px;
    margin: 15px; /* Same margin for small screens */
  }
`;



const Top = styled.div`
  height: 80%;
  width: 100%;
  background: url(${props => props.imageUrl}) no-repeat center center;
  background-size: cover;
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 80%; /* Adjust for smaller screens */
  }
`;

const Bottom = styled.div`
  width: 200%;
  height: 100px;
  transition: transform 0.5s;
  display: flex;
  position: relative;

  &.clicked {
    transform: translateX(-50%);
  }

  .left, .right {
    width: 50%;
    height: 100%;
    position: relative;
  }

  .left {
    background: #f4f4f4;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;

    .details {
      padding: 0px;
      width: calc(70% - 40px);

      h1 {
        font-size: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;

        @media (max-width: 768px) {
          font-size: 9px; /* Adjust for small screens */
        }
      }

      p {
        font-size: 14px;

        @media (max-width: 768px) {
          font-size: 11px; /* Adjust for small screens */
        }
      }
    }

    .buy {
      width: calc(30% - 2px);
      height: 100%;
      background: #f1f1f1;
      transition: background 0.5s;
      border-left: solid thin rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: #A6CDDE;
      }

      svg {
        font-size: 30px;
        margin-bottom: 21px;
        color: #000;

        @media (max-width: 768px) {
          font-size: 25px; /* Adjust for small screens */
          margin-bottom: 75%;

        }
      }
    }
  }
`;

const Inside = styled.div`
  z-index: 9;
  background: #000;
  width: 140px;
  height: 140px;
  position: absolute;
  top: -90px;
  right: -90px;
  border-radius: 0px 0px 200px 200px;
  transition: all 0.5s, border-radius 2s, top 1s;
  overflow: hidden;

  .icon {
    position: absolute;
    right: 95px;
    top: 95px;
    color: white;
    opacity: 1;
    transition: opacity 0.5s;
  }

  &:hover {
    width: 100%;
    right: 0;
    top: 0;
    border-radius: 0;
    height: 80%;

    .icon {
      opacity: 100%;
      right: 15px;
      top: 15px;
    }

    .contents {
      opacity: 1;
      transform: scale(1) translateY(0);
      text-align: center;
    }
  }

  .contents {
    opacity: 0;
    transform: scale(0.5) translateY(-200%);
    transition: opacity 0.2s, transform 0.8s;
            
  
    table {
      width: 100%;
    }

    h1
      color: white;
      @media (max-width: 768px) {
        font-size: 9.5px; /* Adjust text size for small screens */
    }

    p, table {
      color: white;
      @media (max-width: 768px) {
        font-size: 9px; /* Adjust text size for small screens */
    }

    p {
      font-size: 13px;

      @media (max-width: 768px) {
      font-size: 10px; /* Adjust text size for small screens */

    }
  }
`;

const WhiteBox = styled.div`
  background-color: #fff;
  padding: 10px;
  position: relative;
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: ;
    object-fit: cover;
    transition: opacity 0.3s ease-in-out;
    cursor: pointer;

    @media (max-width: 768px) {
      height: 150px; /* Adjust image height for small screens */
    }
  }
`;


export default function ProductBox({ _id, title, price, images , properties}) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/product/${_id}`); // Navigate to the single product page
  };

  useEffect(()=>{

  },properties)

  
  return (
    <ProductWrapper>
      <Top imageUrl={images?.[0]} onClick={handleImageClick} />
      <Bottom>
        <div className="left">
          <div className="details">
            <h1>{title}</h1>
            <p>Rs. {price}</p>
          </div>
          <div className="buy" onClick={handleImageClick} isClicked={isClicked}>
            <AddShoppingCartIcon />
          </div>
        </div>
      </Bottom>
      {<Inside>
        <div className="icon">
          <InfoIcon />
        </div>
          <div className="contents">
          <>
               {
                properties && <>
   {
                  Object.keys(properties).map((pn)=>{
return <>
<h4 style={{
  color:"white"
}}> 
  {pn}
</h4>
<>
{
  properties[pn].map((pp)=>{
    return <p>
      {pp} 
    </p>
  })
}
</>
</>

                  })
                }
                </>
               }
               </>
          </div>
       </Inside> } 
      <WhiteBox>
        <img src={images?.[0]} alt={title} onClick={handleImageClick} />
      </WhiteBox>
    </ProductWrapper>
  );
}
