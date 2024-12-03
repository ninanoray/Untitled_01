import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Separator } from "@/src/components/ui/separator";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import { Fragment } from "react";

export interface Breadcrumbs {
  links?: { title: string; url: string }[];
  title: string;
}

type Props = {
  page: Breadcrumbs;
};

const Header = ({ page }: Props) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 select-none">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-gray-400" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-gray-400" />
        <Breadcrumb>
          <BreadcrumbList>
            {page.links &&
              page.links.map((link) => (
                <Fragment key={link.title}>
                  <BreadcrumbItem className="hidden md:flex gap-2">
                    <BreadcrumbLink href={link.url}>
                      {link.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block text-gray-500" />
                </Fragment>
              ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{page.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Header;
