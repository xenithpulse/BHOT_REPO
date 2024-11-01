import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";

export default async function handle(req, res) {
  await mongooseConnect();

  const cartProducts = req.body.ids || [];

  if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
    console.log("Invalid cart products provided");
    return res.status(400).json({ error: "No cart products provided or invalid format" });
  }

  // Validate each cart product item
  for (const item of cartProducts) {
    if (!item.productId || typeof item.productId !== "string") {
      console.log("Invalid productId in cart item:", item);
      return res.status(400).json({ error: "Each cart item must have a valid productId" });
    }
    if (!item.selectedOptions || typeof item.selectedOptions !== "object") {
      console.log("Invalid selectedOptions in cart item:", item);
      return res.status(400).json({ error: "Each cart item must have valid selectedOptions" });
    }
    // Ensure quantity is a positive integer if provided
    if (item.quantity !== undefined && (!Number.isInteger(item.quantity) || item.quantity <= 0)) {
      console.log("Invalid quantity in cart item:", item);
      return res.status(400).json({ error: "Each cart item must have a valid positive quantity" });
    }
  }

  // Validate product IDs
  const validProductIds = cartProducts
    .map(item => item.productId)
    .filter(id => mongoose.Types.ObjectId.isValid(id))
    .map(id => new mongoose.Types.ObjectId(id));

  if (validProductIds.length === 0) {
    console.log("No valid product IDs found");
    return res.status(400).json({ error: "No valid product IDs provided" });
  }

  try {
    // Fetch products from the database
    const productsInfos = await Product.find({ _id: { $in: validProductIds } });

    // Create an object to store the aggregated quantities
    const quantityMap = {};

    // Aggregate quantities
    cartProducts.forEach(({ productId, quantity = 1 }) => { // Default quantity to 1 if undefined
      quantityMap[productId] = (quantityMap[productId] || 0) + quantity;
    });

    // Update database quantities
    await Promise.all(
      Object.entries(quantityMap).map(async ([productId, totalQuantity]) => {
        const productInfo = productsInfos.find(p => p._id.equals(productId));
        if (productInfo) {
          await Product.updateOne(
            { _id: productInfo._id },
            { $set: { quantity: totalQuantity } }
          );
        }
      })
    );

    // Prepare response
    const line_items = cartProducts.map(({ productId, selectedOptions, quantity = 1 }) => {
      const productInfo = productsInfos.find(p => p._id.equals(productId));
      return productInfo
        ? {
            productId: productInfo._id.toString(),
            selectedOptions,
            quantity,
            price: productInfo.price,
            title: productInfo.title,
            image: productInfo.images[0] || null // Add image to the response
          }
        : null;
    }).filter(Boolean); // Filter out any null entries

    res.json(line_items);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products", details: error.message });
  }
}
