import { DropdownMenuItem } from "@/src/components/ui/dropdown-menu";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  Icon: LucideIcon;
  link?: string;
  color?: string;
  className?: string;
};

const UserMenuItem = ({ title, Icon, link, className = "" }: Props) => {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={() => {
        if (link) router.push(link);
      }}
      className={`group -translate-x-6 hover:translate-x-0 trans-200 cursor-pointer ${className}`}
    >
      <Icon className={`text-white group-hover:text-gray-700 trans-200`} />
      {title}
    </DropdownMenuItem>
  );
};

export default UserMenuItem;
