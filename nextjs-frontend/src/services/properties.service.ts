import { fetchClient } from "./api";

export interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  code: string;
  year: number;
}

export const getProperties = async (
  q: string | null,
  min: number,
  max: number,
) => {
  const searchParams = new URLSearchParams();

  if (q !== null) {
    searchParams.append("q", q);
  }

  searchParams.append("min", min.toString());
  searchParams.append("max", max.toString());

  return fetchClient<Property[]>(`/properties?${searchParams.toString()}`, {
    method: "GET",
  });
};
