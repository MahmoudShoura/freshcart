import ProductInfo from "../components/ProductDetails/ProductInfo";

import { getProductById } from "../server/products.actions";

export default async function ProductDetailsScreen({
  productId,
}: {
  productId: string;
}) {
  const response = await getProductById({ id: productId });

  return (
    <>
      <ProductInfo product={response.data} />
    </>
  );
}
