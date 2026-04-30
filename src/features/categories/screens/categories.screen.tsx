
import NewsletterSection from "@/features/home/components/Newsletter";
import ListedCategories from "../components/ListedCategories";
import ListedSubCategories from "../components/ListedSubCategories";
import TitleSection from "../components/TitleSection";



export default function CategoriesScreen() {
  return (
    <div>
      <TitleSection/>
      <ListedCategories/>
      <ListedSubCategories/>
       <NewsletterSection/>
    </div>
  );
}
