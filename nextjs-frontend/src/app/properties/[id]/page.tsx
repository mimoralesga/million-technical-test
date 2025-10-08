import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import DetailsSection from "../_components/DetailsSection";
import OwnerSection from "../_components/OwnerSection";
import TimelineTrace from "@/components/TimelineTrace";
import { getPropertyById } from "@/services/properties.service";

export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);
  const { image, ownerDetails, trace } = property;

  return (
    <>
      <Navbar>
        <Navbar.Link href="/properties">Properties</Navbar.Link>
        <Navbar.BreadcrumbSeparator />
        <Navbar.Link href={`/properties/${id}`}>{property.name}</Navbar.Link>
      </Navbar>
      <form action="">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-14 xl:px-24 2xl:px-28">
          <div className="flex items-center mt-4 md:mt-12 mb-4 md:mb-12 gap-2">
            <Button variant="outline" size="sm" className="size-7" asChild>
              <Link href="/properties">
                <ArrowLeftIcon className="size-4" />
              </Link>
            </Button>
            <h1 className="text-xl prose text-foreground">{property.name}</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-[65%] flex flex-col gap-4">
              <section className="bg-background rounded shadow-xs border flex flex-col gap-4 overflow-hidden">
                <img
                  className="size-full object-cover"
                  src={image.fileUrl ?? "https://placehold.co/600x400"}
                  alt="Default profile background"
                  width={512}
                  height={96}
                />
              </section>
              <DetailsSection property={property} />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <OwnerSection owner={ownerDetails} />
              <section className="bg-background rounded shadow-xs border flex flex-col gap-4 overflow-hidden p-4">
                <span className="font-medium">Property Trace</span>
                <TimelineTrace trace={trace} />
              </section>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
