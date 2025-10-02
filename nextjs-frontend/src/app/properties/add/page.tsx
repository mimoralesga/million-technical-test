import Navbar from "@/components/Navbar";

export default function AddProperty() {
  return (
    <>
      <Navbar>
        <Navbar.Link href="/properties">Properties</Navbar.Link>
        <Navbar.BreadcrumbSeparator />
        <Navbar.Link href="/properties/new">Add Property</Navbar.Link>
      </Navbar>
    </>
  );
}
