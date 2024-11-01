import Header from "@/components/Header";
import NextJsCarousel from "@/components/Featured";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import AboutUs from "@/components/aboutus";
import Footer from "@/components/footer";
import Image from 'next/image';
import ShuffledProducts from "@/components/shuffledhomeproducts";
import Home from "@/components/category_box";
import { getShuffledProducts } from "./product/shuffledproduct"; // Import the new shuffled products service
import ProductSlide from "@/components/NewProductsSLIDE";

export default function HomePage({ newProducts, shuffledProducts }) {
  return (
    <div style={{ overflowX:"hidden" }}>
      <Header />
      <NextJsCarousel/>
      <Home/>
      <ProductSlide products={newProducts} />

      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '30px',
          marginBottom: '50px'
        }}
      >
        <Image
          src="/9_2000x.webp"
          alt="Decorative Image"
          width={1200}
          height={800}
          style={{
            width: '100%',
            maxWidth: '1200px',
            height: 'auto',
            borderRadius: '10px',
            transform: 'translate(1px, 30px)',
          }}
        />
      </div>
      <ShuffledProducts products={shuffledProducts} />
      <AboutUs />
      <Footer/>
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  console.log("Connected to MongoDB.");

  try {
      const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 6 }).populate('category');
      const shuffledProducts = await getShuffledProducts(12); // Use the new service function

      return {
          props: {
              newProducts: JSON.parse(JSON.stringify(newProducts)),
              shuffledProducts,
          },
      };
  } catch (error) {
      return {
          props: {
              newProducts: [],
              shuffledProducts: [],
          },
      };
  }
}
