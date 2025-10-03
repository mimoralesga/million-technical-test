import { Property } from "@/types/property";
import { fetchClient } from "./api";

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

export const getPropertyById = (id: number) => {
  return fetchClient<Property>(`/properties/${id}`, {
    method: "GET",
  });
};
