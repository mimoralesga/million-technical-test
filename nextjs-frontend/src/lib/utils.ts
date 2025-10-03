import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getApiUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl === undefined) {
    throw new Error(
      "La variable de entorno NEXT_PUBLIC_API_URL no está definida.",
    );
  }

  return apiUrl;
};

export const formatCurrency = (value: number) => {
  if (isNaN(value)) {
    return "N/A";
  }

  const formattedPrice = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formattedPrice;
};
