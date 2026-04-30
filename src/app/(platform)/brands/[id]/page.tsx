import BrandDetailsScreen from "@/features/brands/screens/brand-details-screen";

export default async function BrandDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
     <BrandDetailsScreen brandId={id} />
    </div>
  );
}
