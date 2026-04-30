import DealsBanner from "../components/DealsBanner";
import FeaturedProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";
import OurCategories from "../components/OurCategories";
import PromoBanner from "../components/PromoBanner";
import Slider from "../components/Slider";

export default function HomeScreen() {
  return (
    <>
      <Slider />
      <PromoBanner />
      <OurCategories/>
      <DealsBanner/>
      <FeaturedProducts/>
      <Newsletter/>
    </>
  );
}
