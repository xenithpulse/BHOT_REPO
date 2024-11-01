import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { shuffleProducts } from "./utilshuffelproduct";

/**
 * Fetches and shuffles featured products from the database, returning the specified limit.
 * @param {number} limit - Number of shuffled products to return.
 * @returns {Array} Shuffled featured products array.
 */
export async function getShuffledProducts(limit = 12) {
  await mongooseConnect();
  console.log("Connected to MongoDB for Shuffled Products.");

  try {
    // Fetch only featured products
    const allProducts = await Product.find({ featured: true }).populate('category');
    const shuffledProducts = shuffleProducts(allProducts, limit);
    return JSON.parse(JSON.stringify(shuffledProducts));
  } catch (error) {
    console.error("Error fetching and shuffling products:", error);
    return [];
  }
}
