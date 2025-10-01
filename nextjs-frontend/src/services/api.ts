import { getApiUrl } from "../lib/utils";

const BASE_URL = getApiUrl();

export async function fetchClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
