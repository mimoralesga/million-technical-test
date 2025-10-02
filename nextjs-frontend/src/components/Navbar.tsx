import Logo from "@/components/navbar-components/logo";
import UserMenu from "@/components/navbar-components/user-menu";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlashIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="text-foreground">
                  <Link href="/">
                    <Logo className="w-32 mr-4" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <NavbarBreadcrumbSeparator />
              <BreadcrumbItem className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:text-foreground">
                    <BreadcrumbEllipsis />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem asChild>
                      <a href="#">Properties</a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              {children}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-4">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

function NavbarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <BreadcrumbLink asChild>
      <Link href={href}>{children}</Link>
    </BreadcrumbLink>
  );
}

function NavbarBreadcrumbSeparator() {
  return (
    <BreadcrumbSeparator>
      <SlashIcon size={14} className="rotate-[340deg]" />
    </BreadcrumbSeparator>
  );
}

Navbar.Link = NavbarLink;
Navbar.BreadcrumbSeparator = NavbarBreadcrumbSeparator;
