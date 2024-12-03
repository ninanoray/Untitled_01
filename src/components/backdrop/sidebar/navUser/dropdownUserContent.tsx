import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { useSidebar } from "@/src/components/ui/sidebar";
import { Bell, LogOut, Settings, UserRound } from "lucide-react";
import { User } from ".";
import UserMenuItem from "./userMenuItem";

type Props = {
  user: User;
};

const DropdownUserContent = ({ user }: Props) => {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      side={isMobile ? "bottom" : "right"}
      align="end"
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={user.avatar}
              alt={user.name}
              sizes="32px"
              className="rounded-full"
            />
            <AvatarFallback className="size-full flex-center rounded-lg uppercase">
              {user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <UserMenuItem title="알림" Icon={Bell} />
        <UserMenuItem title="멤버 초대" Icon={UserRound} />
        <UserMenuItem title="설정" Icon={Settings} />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <UserMenuItem title="로그아웃" Icon={LogOut} link="/auth/login" />
    </DropdownMenuContent>
  );
};

export default DropdownUserContent;
