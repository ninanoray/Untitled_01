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
  stared: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
      ],
    },
  ],
  pages: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
      ],
    },
    {
      title: "Travel",
      url: "#",
      icon: Map,
      items: [
        {
          title: "Seoul",
          url: "#",
        },
        {
          title: "Busan",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavWorkSpace workspaces={data.workspaces} />
      </SidebarHeader>
      <SidebarContent>
        <NavPages label="즐겨찾기" pages={data.stared} />
        <NavPages label="페이지" pages={data.pages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
