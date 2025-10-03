import { PropertyImage } from "./property-image";
import { PropertyOwner } from "./property-owner";
import { PropertyTrace } from "./property-trace";

export interface Property {
  id: number;
  name: string;
  address: string;
  price: number;
  code: string;
  year: number;
  owner: PropertyOwner;
  image: PropertyImage;
  trace: PropertyTrace[];
}
