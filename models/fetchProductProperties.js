// Assume this file is in your `model` directory
import { Product } from '@/models/Product'; // Adjust path as needed

export async function fetchProductProperties(productId) {
  const product = await Product.findById(productId).exec();
  return product ? product.properties : {};
}
