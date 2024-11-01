import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/homecenter";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { useRouter } from "next/router";
import { keyframes } from "styled-components";
import Image from 'next/image'
import Title from "@/components/Title";
import EmptyCart from "./emptycart";


const ColumnsWrapper = styled.div`
  display: grid;
  height: 900px;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 2fr 2fr;
  }
  margin-top: 40px;
  margin-bottom: 200px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  display: flex;
  align-items: flex-start;
  padding: 10px;
`;

const ProductImageBox = styled.div`
  display: flex;
  width: 120px;
  height: 120px;
  margin-right: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SelectedOptions = styled.p`
  font-size: 0.9rem;
  margin: 5px 0;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #000;
  padding: 5px;
  width: fit-content;
`;

const QuantityLabel = styled.span`
  margin: 0 10px;
  font-size: 1rem;
`;

const EditButton = styled.button`
  background-color: lightblue;
  border: none;
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #d1ecf1;
  }
`;


const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
`;

const SuccessOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeOut} 5s forwards;
`;

const SuccessMessage = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TickIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  &::before {
    content: '✔';
    font-size: 40px;
    color: white;
  }
`;

const SuccessMessage_1 = styled.h2`
  background: linear-gradient(to right, #662D8C , #ED1E79);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 3px;
`;
const RequiredField = styled.span`
  color: red;
  margin-left: 2px;
`;

const OrderSummary = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-top: 2px solid black;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 1rem;
`;

const DeliveryInfo = styled.span`
  font-size: 0.85rem;
  color: gray;
`;

const PaymentOptionContainer = styled.div`
  border: 2px solid black;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  transition: all 0.3s ease; // Smooth animation
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? 'lightblue' : 'white')}; // Light blue when selected
`;


const PaymentOptionTitle = styled.h3`
  display: inline-block;
  margin: 0; // Remove default margin
  font-size: 1.3rem;
  font-weight: normal;
`;

const PaymentOptionDescription = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  background-color: ${({ isSelected }) => (isSelected ? '#e0f7ff' : 'transparent')};
  padding: 10px;
  margin-top: 5px;
  font-size: 14px;
  line-height: 1.5;
  transition: all 0.3s ease;
`;

const PaymentOptionCircle = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #000;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  background-color: ${({ isSelected }) => (isSelected ? '#3498db' : 'transparent')};
`;




export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const [selectedPayment, setPaymentMethod] = useState(null);
  const [error, setError] = useState('');
  
  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);  // Correctly sets the payment method, including 'COD'
  };
  
  const itemsTotal = cartProducts.reduce((acc, cartItem) => {
    const product = products.find(p => p.productId === cartItem.productId);
    const priceMatch = cartItem.selectedOptions.Dimensions?.match(/\(PKR\s([\d,.]+)\)/);
    const price = priceMatch ? parseFloat(priceMatch[1].replace(",", "")) : product?.price;
    return acc + (price * cartItem.quantity);
  }, 0);
  
  const shopDiscount = itemsTotal * 0.05; // Assuming a 25% shop discount
  

  // Fetch the product details based on cart products
  useEffect(() => {
    const formattedCartProducts = cartProducts.map(product => ({
      productId: product.productId,
      selectedOptions: product.selectedOptions || {},
    }));

    if (formattedCartProducts.length > 0) {
      axios.post('/api/cart', { ids: formattedCartProducts })
        .then(response => {
          setProducts(response.data); // Set full product details
        })
        .catch(error => {
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      // Clear cart from context and local storage
      clearCart();
      localStorage.removeItem('cartProducts');
    }
  }, [clearCart]); // added clearCart as a dependency


  const validateInputs = () => {
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!city) newErrors.city = 'City is required';
    if (!phone) newErrors.phone = 'Phone number is required';
    if (!streetAddress) newErrors.streetAddress = 'Street address is required';
    if (!country) newErrors.country = 'Country is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;  // Returns true if no errors
  };

  const moreOfThisProduct = (productId, selectedOptions) => {
    addProduct(productId, selectedOptions);
    
  };

  const lessOfThisProduct = (productId, selectedOptions) => {
    removeProduct(productId, selectedOptions);
};


  const goToPayment = async () => {
    if (validateInputs()) {
      if (!selectedPayment) {
        setError('Please select a payment method before proceeding.');
        return;
      }
  
      try {
        const response = await axios.post('/api/checkout', {
          name,
          email,
          city,
          phone,
          streetAddress,
          country,
          cartProducts,
          paymentMethod: selectedPayment,  // Include selected payment method
        });
  
        if (response.data.success) {
          clearCart();
          setIsSuccess(true);
          localStorage.removeItem('cartProducts');
          setTimeout(() => {
            router.push('/');
          }, 5000);
        } else {
          console.error("Order placement failed:", response.data.message);
        }
      } catch (error) {
        console.error("Checkout error:", error);
      }
    } else {
      console.error("Input validation failed");
    }
  };
  
  


if (isSuccess) {
  return (
    <SuccessOverlay>
      <SuccessMessage>
        <TickIcon />
        <SuccessMessage_1>Thanks for your order</SuccessMessage_1>
        <p>Soon, You will receive a call for order confirmation</p>
      </SuccessMessage>
    </SuccessOverlay>
  );
}

  let total = 0;


  cartProducts.forEach(cartItem => {
    const product = products.find(p => p.productId === cartItem.productId);
    if (product) {
      const priceMatch = cartItem.selectedOptions.Dimensions?.match(/\(PKR\s([\d,.]+)\)/);
      const price = priceMatch ? parseFloat(priceMatch[1].replace(",", "")) : product.price;
      total += price * cartItem.quantity;
    }
  });

  

  return (
    <>
      <Header />
      <Center>
        {/* Render the EmptyCart outside the ColumnsWrapper when the cart is empty */}
        {!cartProducts?.length ? (
          <EmptyCart />
        ) : (
          <ColumnsWrapper>
            <Box>
              <Title>Cart</Title>
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((cartItem, index) => {
                    const product = products.find(p => p.productId === cartItem.productId);
                    if (!product) {
                      console.error("Product not found for cart item with productId:", cartItem.productId);
                      return null;
                    }
  
                    const quantity = cartItem.quantity || 1;
                    console.log(quantity)
                    const priceMatch = cartItem.selectedOptions.Dimensions?.match(/\(PKR\s([\d,.]+)\)/);
                    const price = priceMatch ? parseFloat(priceMatch[1].replace(",", "")) : product.price;
  
                    return (
                      <tr key={index}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.title}
                                width={500} // Set appropriate width
                                height={500} // Set appropriate height
                                layout="responsive" // You can adjust layout as needed
                              />
                            ) : (
                              <span>No image available</span>
                            )}
                          </ProductImageBox>
                          <ProductDetails>
                            <ProductTitle style={{ overflow: "hidden", textOverflow: 'ellipsis' }}>
                              {product.title.length > 50 ? product.title.slice(0, 50) + "..." : product.title}
                            </ProductTitle>
                            <SelectedOptions>
                              Dimension: {cartItem.selectedOptions.Dimensions.split(' ')[0]}<br />
                              Color: {cartItem.selectedOptions.Colors}
                            </SelectedOptions>
                            <ControlsContainer>
                              <QuantityControl>
                                <Button onClick={() => lessOfThisProduct(cartItem.productId, cartItem.selectedOptions)}>-</Button>
                                <QuantityLabel>{quantity}</QuantityLabel>
                                <Button onClick={() => moreOfThisProduct(cartItem.productId, cartItem.selectedOptions)}>+</Button>
                              </QuantityControl>
                            </ControlsContainer>
                          </ProductDetails>
                        </ProductInfoCell>
                        <td>PKR {price.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
  
              {/* Order Summary Section */}
              <OrderSummary>
                <SummaryItem>
                  <span>Item(s) total:</span>
                  <span>PKR {itemsTotal.toFixed(2)}</span>
                </SummaryItem>
  
                <SummaryItem>
                  <span>Shop discount:</span>
                  {itemsTotal >= 5000 ? (
                    <span>-PKR {shopDiscount.toFixed(2)}</span>
                  ) : (
                    <span>PKR 0.00</span>
                  )}
                </SummaryItem>
  
                <SummaryItem>
                  <span>Subtotal:</span>
                  <span>
                    PKR {(itemsTotal - (itemsTotal >= 5000 ? shopDiscount : 0)).toFixed(2)}
                  </span>
                </SummaryItem>
  
                <SummaryItem>
                  <span>Delivery:</span>
                  <span>
                    {itemsTotal >= 3000 ? (
                      <>FREE <DeliveryInfo>(Pakistan)</DeliveryInfo></>
                    ) : (
                      <>PKR 99.00 <DeliveryInfo>(Pakistan)</DeliveryInfo></>
                    )}
                  </span>
                </SummaryItem>
  
                <SummaryItem>
                  <strong>Total ({cartProducts.length} item{cartProducts.length > 1 ? 's' : ''}):</strong>
                  <strong>
                    PKR {(itemsTotal - (itemsTotal >= 5000 ? shopDiscount : 0) + (itemsTotal < 3000 ? 99 : 0)).toFixed(2)}
                  </strong>
                </SummaryItem>
              </OrderSummary>
            </Box>
  
            {!!cartProducts?.length && (
              <Box>
                <Title>Order Information</Title>
                <label>
                  Name<RequiredField>*</RequiredField>
                </label>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
  
                <label>
                  Email<RequiredField>*</RequiredField>
                </label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
  
                <label>
                  City<RequiredField>*</RequiredField>
                </label>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
                {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
  
                <label>
                  Phone<RequiredField>*</RequiredField>
                </label>
                <Input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
  
                <label>
                  Street Address<RequiredField>*</RequiredField>
                </label>
                <Input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                {errors.streetAddress && <ErrorMessage>{errors.streetAddress}</ErrorMessage>}
  
                <label>
                  Country<RequiredField>*</RequiredField>
                </label>
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                {errors.country && <ErrorMessage>{errors.country}</ErrorMessage>}
  
                <Title>Payment</Title>
  
                <PaymentOptionContainer
                  isSelected={selectedPayment === 'COD'}
                  onClick={() => handlePaymentSelection('COD')}
                >
                  <PaymentOptionCircle isSelected={selectedPayment === 'COD'} />
                  <PaymentOptionTitle>Cash on Delivery (COD)</PaymentOptionTitle>
                </PaymentOptionContainer>
  
                <PaymentOptionContainer
                  isSelected={selectedPayment === 'Bank Transfer'}
                  onClick={() => handlePaymentSelection('Bank Transfer')}
                >
                  <PaymentOptionCircle isSelected={selectedPayment === 'Bank Transfer'} />
                  <PaymentOptionTitle>Bank Transfer</PaymentOptionTitle>
                  <PaymentOptionDescription isVisible={selectedPayment === 'Bank Transfer'}>
                    {/* Description content */}
                    1. Make your transfer to the details mentioned below<br /><br />
          
                    <strong>Bank:</strong> MEEZAN BANK<br />
                    <strong>Account Title:</strong> TAHIR SALEEM<br />
                    <strong>Account No:</strong> 0210-0101-5212-65<br /><br />
  
                    2. Share the screenshot of your transaction receipt at <strong>https://wa.link/p3muym || 0329-7511100</strong>.<br /><br />
  
                    You will receive a confirmation call from us in working hours, verifying 
                    all the details. Please make sure to mention to our representative that you
                    made an online transfer. Your order will be dispatched after that.
                  </PaymentOptionDescription>
                </PaymentOptionContainer>
  
                {error && <ErrorMessage>{error}</ErrorMessage>}
  
                <Button
                  black
                  block
                  onClick={goToPayment}
                  style={{ width: "100%", maxWidth: "600px", height: "48px" }}
                >
                  Complete Order
                </Button>
              </Box>
            )}
          </ColumnsWrapper>
        )}
      </Center>
    </>
  );
}  

