import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import Navbar from "@/components/Navbar";
import ProfileBg from "@/components/ProfileBg";
import { Button } from "@/components/ui/button";
import DetailsSection from "../_components/DetailsSection";
import OwnerSection from "../_components/OwnerSection";

export default function AddProperty() {
  return (
    <>
      <Navbar>
        <Navbar.Link href="/properties">Properties</Navbar.Link>
        <Navbar.BreadcrumbSeparator />
        <Navbar.Link href="/properties/add">Add Property</Navbar.Link>
      </Navbar>
      <form action="">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-14 xl:px-24 2xl:px-28">
          <div className="flex items-center justify-between mt-4 md:mt-12 mb-4 md:mb-12">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="size-7" asChild>
                <Link href="/properties">
                  <ArrowLeftIcon className="size-4" />
                </Link>
              </Button>
              <h1 className="text-xl prose text-foreground">
                Add a new property
              </h1>
            </div>
            <Button size="sm" className="text-sm h-7" type="submit">
              Publish
            </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-[65%] flex flex-col gap-4">
              <section className="bg-background rounded shadow-xs border flex flex-col gap-4 overflow-hidden">
                <ProfileBg />
              </section>
              <DetailsSection />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <OwnerSection />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
