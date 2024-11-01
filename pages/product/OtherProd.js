import Center from "@/homecenter";
import ProductsGrid from "@/homepagegrid";
import Title from "@/components/Title";

export default function OtherProdSection({ products }) {
  return (
    <Center>
      <Title style={{ marginTop: '80px' }}>Related Items You May Also Like</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
