import NewsletterSection from "@/features/home/components/Newsletter";
import NotFound from "../components/NotFound";

export default function NotFoundScreen() {
  return (
    <>
      <NotFound />

      <div className="mx-60 ">
        <NewsletterSection />
      </div>
    </>
  );
}
