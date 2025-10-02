import {
  createLoader,
  SearchParams,
  parseAsString,
  parseAsInteger,
} from "nuqs/server";

import Navbar from "@/components/Navbar";
import PropertiesToolbar from "./_components/PropertiesToolbar";
import PropertyList from "./_components/PropertyList";
import { getProperties } from "@/services/properties.service";

export const searchParams = {
  q: parseAsString,
  min: parseAsInteger.withDefault(0),
  max: parseAsInteger.withDefault(1000000),
};
export const loadSearchParams = createLoader(searchParams);

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Properties({ searchParams }: PageProps) {
  const { q, min, max } = await loadSearchParams(searchParams);
  const properties = await getProperties(q, min, max);

  return (
    <>
      <Navbar>
        <Navbar.Link href="/properties">Properties</Navbar.Link>
      </Navbar>
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-14 xl:px-24 2xl:px-28">
        <h1 className="text-xl prose text-foreground mt-4 md:mt-12 mb-12">
          Properties
        </h1>
        <PropertiesToolbar />
        <PropertyList properties={properties} />
      </div>
    </>
  );
}
