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
import UserMenuItem from "./userMenuItem";
import { User } from "@/src/types/type";
import { useRouter } from "next/navigation";
import { useDataStore } from "@/src/stores/storeProvider";

type Props = {
  user: User | undefined;
};

const DropdownUserContent = ({ user }: Props) => {
  const userAvatar = user?.avatar;
  const userName = user?.nickname || "untitled";
  const userEmail = user?.email || "untitled@untitled.com";

  const { isMobile } = useSidebar();

  const router = useRouter();

  const { reset } = useDataStore((state) => state);

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
              src={userAvatar}
              alt={userName}
              sizes="32px"
              className="rounded-full"
            />
            <AvatarFallback className="size-full flex-center rounded-lg uppercase">
              {userName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{userName}</span>
            <span className="truncate text-xs">{userEmail}</span>
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
      <UserMenuItem
        title="로그아웃"
        Icon={LogOut}
        onClick={() => {
          reset();
          router.push("/auth/login");
        }}
      />
    </DropdownMenuContent>
  );
};

export default DropdownUserContent;
