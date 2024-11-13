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

interface Props {
  page: { links?: { title: string; url: string }[]; title: string };
}
const Header = ({ page }: Props) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 bg-slate-200 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 select-none">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-black" />
        <Breadcrumb>
          <BreadcrumbList>
            {page.links && (
              <>
                <BreadcrumbItem className="hidden md:block">
                  {page.links.map((link) => (
                    <BreadcrumbLink key={link.title} href={link.url}>
                      {link.title}
                    </BreadcrumbLink>
                  ))}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            )}
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
