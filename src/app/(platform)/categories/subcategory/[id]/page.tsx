import SubCategoryDetailsScreen from "@/features/categories/screens/subcategory-detail-screen";


export default async function SubCategoryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
     <SubCategoryDetailsScreen subcategoryId={id} />
    </div>
  );
}
