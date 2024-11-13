"use client";

import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
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
