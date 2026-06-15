import WishlistScreen from "@/features/wishlist/screens/wishlist.screen";
import { getWishlist } from "@/features/wishlist/server/wishlist.actions";
import { WishlistProduct } from "@/features/wishlist/types/wishlist.types";

export const dynamic = "force-dynamic";

export default async function AccountWishlistPage() {
  let initialWishlist: WishlistProduct[] = [];

  try {
    initialWishlist = await getWishlist();
  } catch (error) {
    console.error("Failed to fetch wishlist:", error);
  }

  return <WishlistScreen initialWishlist={initialWishlist} />;
}
