"use client";

import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./sidebar/app-sidebar";

interface Props {
  children: ReactNode;
}
const Backdrop = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default Backdrop;
