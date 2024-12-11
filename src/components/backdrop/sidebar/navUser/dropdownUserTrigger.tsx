import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/src/components/ui/sidebar";
import { User } from "@/src/types/type";
import { ChevronsUpDown } from "lucide-react";

type Props = {
  user: User | undefined;
};

const DropdownUserTrigger = ({ user }: Props) => {
  const userAvatar = user?.avatar;
  const userName = user?.nickname || "untitled";
  const userEmail = user?.email || "untitled@untitled.com";

  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage
            src={userAvatar}
            alt={userName}
            sizes="32px"
            className="rounded-full"
          />
          <AvatarFallback className="size-full flex-center rounded-full uppercase">
            {userName.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{userName}</span>
          <span className="truncate text-xs">{userEmail}</span>
        </div>
        <ChevronsUpDown className="ml-auto size-4" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  );
};

export default DropdownUserTrigger;
