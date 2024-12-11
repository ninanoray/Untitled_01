import { DropdownMenuItem } from "@/src/components/ui/dropdown-menu";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

type Props = {
  title: string;
  Icon: LucideIcon;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  link?: string;
  color?: string;
  className?: string;
};

const UserMenuItem = ({ title, Icon, onClick, className = "" }: Props) => {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className={`group -translate-x-6 hover:translate-x-0 trans-200 cursor-pointer ${className}`}
    >
      <Icon className={`text-white group-hover:text-gray-700 trans-200`} />
      {title}
    </DropdownMenuItem>
  );
};

export default UserMenuItem;
