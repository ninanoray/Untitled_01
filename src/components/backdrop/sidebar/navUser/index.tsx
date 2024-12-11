"use client";

import { DropdownMenu } from "@/src/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/src/components/ui/sidebar";
import DropdownUserContent from "./dropdownUserContent";
import DropdownUserTrigger from "./dropdownUserTrigger";
import { User } from "@/src/types/type";

type Props = {
  user: User | undefined;
};

export function NavUser({ user }: Props) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownUserTrigger user={user} />
          <DropdownUserContent user={user} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
