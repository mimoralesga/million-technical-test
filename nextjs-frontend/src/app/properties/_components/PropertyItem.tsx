import Link from "next/link";

export default function PropertyItem({
  id,
  name,
  address,
  price,
  image,
}: {
  id: string;
  name: string;
  address: string;
  price: number;
  image: string | null;
}) {
  const formattedPrice = price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Link href={`/properties/${id}`}>
      <div className="border rounded shadow-xs hover:bg-muted/50 overflow-hidden group">
        <img
          src={image ?? "https://placehold.co/600x400"}
          alt="Property Image"
          className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-300"
        />
        <div className="p-4">
          <h2 className="font-medium text-lg mb-4">{formattedPrice}</h2>
          <h3 className="text-base">{name}</h3>
          <p className="text-sm text-muted-foreground">{address}</p>
        </div>
      </div>
    </Link>
  );
}
