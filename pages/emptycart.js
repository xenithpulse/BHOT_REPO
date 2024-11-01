// pages/cart.js
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Center from '@/homecenter';
import Button from '@/components/CustomButton';

const Container = styled.div`
  background-color: #fff;
  margin-top: 0%;
  margin-left: 0%;
  text-align: center;
  font-family: 'Calibri', sans-serif !important;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px); /* Center vertically within the viewport */
`;

const Card = styled.div`
  margin: 0 auto; /* Center the card */
  border: 0;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  border-radius: 8px;
  box-shadow: 1px 5px 24px 0 rgba(68, 102, 242, 0.05);
  max-width: 400px; /* Set a maximum width for the card */
  width: 90%; /* Make the card responsive */
`;


const CardBody = styled.div`
  padding: 30px;
  background-color: #fff;
`;

const EmptyCartImage = styled.img`
  width: 130px;
  height: 130px;
  margin-bottom: 20px; /* Add margin for spacing */
`;

const EmptyCartTitle = styled.h3`
  font-weight: bold;
`;

const EmptyCartMessage = styled.h4`
  color: #555;
`;


export default function EmptyCart() {
  const router = useRouter();

  const handleContinueShopping = () => {
    // Replace with your desired route for continuing shopping
    router.push('/'); 
  };

  return (
    <Center>
    <Container>
      <Card>
        <CardBody>
          <div className="empty-cart-cls">
            <EmptyCartImage src="https://img.icons8.com/nolan/512/1A6DFF/C822FF/clear-shopping-cart.png" alt="Empty Cart" />
            <EmptyCartTitle>Your Cart is Empty</EmptyCartTitle>
            <EmptyCartMessage>Add something to make me happy :)</EmptyCartMessage>
            <Button
                block
                gradient="linear-gradient(to left top, #59B8F4, #1A6DFF, #C822FF)"
                gradientHover="linear-gradient(to top right, #000, #000)"
                radius="full"
                onClick={handleContinueShopping}
                style={{ width: "100%", maxWidth: "600px", height: "48px" }}
              >
                Continue Shopping
              </Button>
          </div>
        </CardBody>
      </Card>
    </Container>
    </Center>
  );
}
