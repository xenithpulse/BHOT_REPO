import Header from "@/components/Header";
import Center from "@/homecenter";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/homepagegrid";
import { Category } from "@/models/Category"; // Ensure this path is correct
import Title from "@/components/Title";

export default function Wallart({ products }) {
  return (
    <>
      <Header />
        <Center>
          <Title style={{ marginTop: '80px'}}>Explore Home Decor</Title> {/* Adjust margin here */}
          <ProductsGrid products={products} />
        </Center>
    </>
  );
}


export async function getServerSideProps() {
  await mongooseConnect();

  // Find the category by name
  const category = await Category.findOne({ name: 'Home Decor' });

  if (!category) {
    // Handle case where category is not found
    return {
      props: {
        products: [],
      }
    };
  }

  // Fetch products that belong to the found category
  const products = await Product.find({ category: category._id }, null, { sort: { '_id': -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  };
}