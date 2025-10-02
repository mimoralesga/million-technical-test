import Navbar from "@/components/Navbar";

export default function PropertyDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <>
      <Navbar>
        <Navbar.Link href="/properties">Properties</Navbar.Link>
        <Navbar.BreadcrumbSeparator />
        <Navbar.Link href={`/properties/${id}`}>Property Details</Navbar.Link>
      </Navbar>
    </>
  );
}
