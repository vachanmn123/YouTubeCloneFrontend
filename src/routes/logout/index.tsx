import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../lib/checkAuth";
import { logout } from "@/lib/logout";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutPage() {
  const qCLient = useQueryClient();
  const navigate = useNavigate();
  const loggedIn = checkAuth();
  if (!loggedIn) {
    navigate("/");
  }
  logout().then(() => {
    qCLient.invalidateQueries({
      queryKey: ["currentUser"],
    });
    navigate("/");
  });
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <AiOutlineLoading3Quarters className="animate-spin" />
      <h1 className="text-4xl font-bold">Logging out...</h1>
    </div>
  );
}
