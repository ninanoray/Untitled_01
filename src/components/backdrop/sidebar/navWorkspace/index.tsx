"use client";

import { DropdownMenu } from "@/src/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/src/components/ui/sidebar";
import { ElementType, useState } from "react";
import DropdownWorkspaceContent from "./dropdownWorkspaceContent";
import DropdownWorkspaceTrigger from "./dropdownWorkspaceTrigger";

export interface Workspace {
  name: string;
  logo: ElementType;
  plan: string;
}

type Props = {
  workspaces: Workspace[];
};

export function NavWorkSpace({ workspaces }: Props) {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownWorkspaceTrigger workspace={activeWorkspace} />
          <DropdownWorkspaceContent
            workspaces={workspaces}
            handleClick={setActiveWorkspace}
          />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
