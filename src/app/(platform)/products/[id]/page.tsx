import ProductDetailsScreen from "@/features/products/screens/product-details.screen";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  return (
    <>
      <ProductDetailsScreen productId={id} />
    </>
  );
}
