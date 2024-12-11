"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/src/components/ui/sidebar";
import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  Map,
  SquareTerminal,
} from "lucide-react";
import * as React from "react";
import { NavPages } from "./navPages";
import { NavUser } from "./navUser";
import { NavWorkSpace } from "./navWorkspace";
import useDataStore, { createDataStore } from "@/src/stores/useStore";

const data = {
  user: {
    name: "무제",
    email: "untitled_01@gmail.com",
    avatar: "https://github.com/shadcn.png",
  },
  workspaces: [
    {
      name: "워크스페이스 1",
      logo: GalleryVerticalEnd,
      plan: "개인",
    },
    {
      name: "워크스페이스 2",
      logo: AudioWaveform,
      plan: "회사",
    },
    {
      name: "워크스페이스 3",
      logo: Command,
      plan: "친구",
    },
  ],
  starred: [
    {
      title: "Playground",
      url: "/playground",
      icon: SquareTerminal,
      items: [
        {
          title: "History",
          url: "/playground/history",
        },
      ],
    },
  ],
  pages: [
    {
      title: "Playground",
      url: "/playground",
      icon: SquareTerminal,
      items: [
        {
          title: "History",
          url: "/playground/history",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/documentation",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/documentation/introduction",
        },
        {
          title: "Get Started",
          url: "/documentation/getStarted",
        },
        {
          title: "Tutorials",
          url: "/documentation/tutorials",
        },
      ],
    },
    {
      title: "Travel",
      url: "/travel",
      icon: Map,
      items: [
        {
          title: "Seoul",
          url: "/travel/seoul",
        },
        {
          title: "Busan",
          url: "/travel/busan",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const globalUser = useDataStore(createDataStore, (state) => state.user);

  return (
    <Sidebar collapsible="icon" {...props} className="select-none">
      <SidebarHeader>
        <NavWorkSpace workspaces={data.workspaces} />
      </SidebarHeader>
      <SidebarContent>
        <NavPages label="즐겨찾기" pages={data.starred} />
        <NavPages label="페이지" pages={data.pages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={globalUser} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
