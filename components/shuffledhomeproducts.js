import Center from "@/homecenter";
import ProductsGrid from "@/homepagegrid";
import Title from "./Title";

export default function ShuffledProducts({products}) {
  return (
    <Center>
      <Title style={{marginTop:"60px"}}>Featured Products</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}