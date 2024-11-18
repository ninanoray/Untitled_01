import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/src/components/ui/sidebar";
import { ChevronsUpDown } from "lucide-react";
import { User } from ".";

type Props = {
  user: User;
};

const DropdownUserTrigger = ({ user }: Props) => {
  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage
            src={user.avatar}
            alt={user.name}
            sizes="32px"
            className="rounded-full"
          />
          <AvatarFallback className="size-full flex-center rounded-full uppercase">
            {user.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user.name}</span>
          <span className="truncate text-xs">{user.email}</span>
        </div>
        <ChevronsUpDown className="ml-auto size-4" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  );
};

export default DropdownUserTrigger;
