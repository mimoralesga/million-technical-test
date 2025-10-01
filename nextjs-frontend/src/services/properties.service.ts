import { fetchClient } from "./api";

interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  code: string;
  year: number;
}

export const getProperties = async () => {
  return fetchClient<Property[]>("/properties");
};
