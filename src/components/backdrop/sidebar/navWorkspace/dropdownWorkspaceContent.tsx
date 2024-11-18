import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/src/components/ui/dropdown-menu";
import { useSidebar } from "@/src/components/ui/sidebar";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Workspace } from ".";

type Props = {
  workspaces: Workspace[];
  handleClick: Dispatch<SetStateAction<Workspace>>;
};

const DropdownWorkspaceContent = ({ workspaces, handleClick }: Props) => {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      align="start"
      side={isMobile ? "bottom" : "right"}
      sideOffset={4}
    >
      <DropdownMenuLabel className="text-xs text-muted-foreground">
        워크스페이스
      </DropdownMenuLabel>
      {workspaces.map((workspace, index) => (
        <DropdownMenuItem
          key={workspace.name}
          onClick={() => handleClick(workspace)}
          className="gap-2 p-2"
        >
          <div className="flex size-6 items-center justify-center rounded-sm border">
            <workspace.logo className="size-4 shrink-0" />
          </div>
          {workspace.name}
          <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
        </DropdownMenuItem>
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem className="gap-2 p-2">
        <div className="flex size-6 items-center justify-center rounded-md border bg-background">
          <Plus className="size-4" />
        </div>
        <div className="font-medium text-muted-foreground">새 워크스페이스</div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default DropdownWorkspaceContent;
