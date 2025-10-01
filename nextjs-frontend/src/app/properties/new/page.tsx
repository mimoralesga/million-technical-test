import Navbar from "@/components/Navbar";

export default function NewProperty() {
  return (
    <>
      <Navbar>
        <Navbar.Link href="/properties">Properties</Navbar.Link>
        <Navbar.BreadcrumbSeparator />
        <Navbar.Link href="/properties/new">New Property</Navbar.Link>
      </Navbar>
    </>
  );
}