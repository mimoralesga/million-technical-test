import Navbar from "@/components/Navbar";
import PropertiesToolbar from "./_components/PropertiesToolbar";
import { Suspense } from "react";
import PropertyItem from "./_components/PropertyItem";

export default function Properties() {
  return (
    <>
      <Navbar>
        <Navbar.Link href="/properties">Properties</Navbar.Link>
      </Navbar>
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-14 xl:px-24 2xl:px-28">
        <h1 className="text-xl prose text-foreground mt-4 md:mt-12 mb-12">
          Properties
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <PropertiesToolbar />
        </Suspense>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <PropertyItem
            id="1"
            name="Property 1"
            address="123 Main St"
            price={100000}
          />
        </div>
      </div>
    </>
  );
}
