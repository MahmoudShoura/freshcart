import CategoryDetailsScreen from "@/features/categories/screens/category-details-screen";


export default async function CategoryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
     <CategoryDetailsScreen categoryId={id} />
    </div>
  );
}
