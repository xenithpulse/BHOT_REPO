import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import mongoose from 'mongoose';
import axios from 'axios';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).json('Invalid request method, should be POST');
    return;
  }

  const {
    name, email, city,
    phone, streetAddress, country,
    cartProducts, paymentMethod
  } = req.body;


  if (!name || !email || !cartProducts || !Array.isArray(cartProducts) || cartProducts.length === 0) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  await mongooseConnect();

  // Validate and convert product IDs to ObjectId
  let validProductIds = [];
  try {
    validProductIds = cartProducts.map(({ productId }) => {
      if (mongoose.Types.ObjectId.isValid(productId)) {
        return new mongoose.Types.ObjectId(productId);
      } else {
        throw new Error(`Invalid productId: ${productId}`);
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  // Fetch product information using valid ObjectIds
  let productsInfos = [];
  try {
    productsInfos = await Product.find({ _id: { $in: validProductIds } });
    if (productsInfos.length === 0) {
      return res.status(404).json({ message: 'No products found for the given IDs.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching product information.', details: error.message });
  }

  let line_items = [];
  for (const { productId, selectedOptions: productSelectedOptions, quantity } of cartProducts) {
      const productInfo = productsInfos.find(p => p._id.equals(productId));
  
  
      if (quantity > 0 && productInfo) {
          line_items.push({
              productId: productInfo._id,  // Use the ObjectId from the productInfo
              selectedOptions: productSelectedOptions || {},  // Use the selectedOptions for this product
              quantity,
          });
      }
  }
  
  
  

  const crypto = require('crypto'); // Ensure this line is present at the top of your file
const ua = require('universal-analytics'); // Import universal-analytics

if (line_items.length === 0) {
  console.error('No valid line items provided.');
  return res.status(400).json({ message: 'No valid line items to create an order.' });
}

try {
  
  const orderDoc = await Order.create({
    line_items, 
    name, 
    email,
    city, 
    phone: req.body.phone, 
    streetAddress, 
    country, 
    paid: false,
    paymentMethod
  });

  
  res.json({
    message: "Order placed successfully. You will receive a confirmation message soon.",
    success: true,
    order: orderDoc, // Send back the order document for further usage
  });


  // Track Purchase Event using Facebook Conversion API
  try {
    const pixelId = process.env.PIXEL_ID;
    const accessToken = process.env.FB_CAPI_ACCESS_TOKEN;


    // Ensure totalPrice is defined
    const totalPrice = orderDoc.totalPrice || 0; 

    
    const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');
    const hashedPhone = crypto.createHash('sha256').update(req.body.phone).digest('hex');


    const response = await axios.post(
      `https://graph.facebook.com/v12.0/${pixelId}/events?access_token=${accessToken}`,
      {
        data: [
          {
            event_name: 'Purchase',
            event_time: Math.floor(new Date().getTime() / 1000),
            event_source_url: 'https://aladdindecor.store/cart',
            user_data: {
              em: hashedEmail, // Hashed email for matching
              ph: hashedPhone, // Hashed phone number
            },
            custom_data: {
              currency: 'PKR',
              value: totalPrice, // Ensure this is set correctly
              content_ids: line_items.map(item => item.productId),
              contents: line_items.map(item => ({
                id: item.productId,
                quantity: item.quantity,
              })),
              content_type: 'product',
            },
          },
        ],
      }
    );

    
    // Send data to Google Analytics
    const trackingId = process.env.GA_TRACKING_ID; // Your Google Analytics tracking ID
    const visitor = ua(trackingId); // Initialize Google Analytics

    // Send the purchase event to Google Analytics
    visitor.event("Ecommerce", "Purchase", {
      ec: "Ecommerce",
      ea: "Purchase Event",
      el: "Order ID: " + orderDoc._id,
      ev: totalPrice,
      cid: hashedEmail // Use hashed email as Client ID
    }).send(); // Send the event


  } catch (error) {
    console.error('Failed to send purchase event to Facebook:', error.message);
  }
} catch (error) {
  console.error('Failed to create order:', error.message);
  return res.status(500).json({ message: 'Internal Server Error' });
}}