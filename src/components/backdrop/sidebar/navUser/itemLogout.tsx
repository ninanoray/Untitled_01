import { DropdownMenuItem } from "@/src/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const ItemLogout = () => {
  const router = useRouter();

  return (
    <DropdownMenuItem onClick={() => router.push("/auth/login")}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
};

export default ItemLogout;
