import { useDispatch } from "react-redux";
import { setAuthInfo } from "@/store/auth.slice";
import { clearToken } from "../server/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { clearCart, clearGuestCart } from "@/features/cart/store/cart.slice";

export default function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    await clearToken();

    dispatch(clearCart());
    dispatch(clearGuestCart());

    dispatch(setAuthInfo({ isAuthenticated: false, userInfo: null }));

    toast.success("Logged out successfully");

    router.push("/login");
    router.refresh();
  };

  return { logout };
}
