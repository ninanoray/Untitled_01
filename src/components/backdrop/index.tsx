"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./sidebar/app-sidebar";

interface Props {
  children: ReactNode;
}
const BackdropProvider = ({ children }: Props) => {
  const currentPath = usePathname();
  if (!currentPath.includes("/login"))
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    );
  else return <>{children}</>;
};

export default BackdropProvider;
