// app/lib/server.ts
import { URLSearchParams } from "url";

export type ResourceNameProps = "products" | "categories" | "variants"; // Add other resource names as needed
export const API_URL = "http://localhost:3000";

export const fetchData = async ({
  resourceName,
  method = "GET",
  body,
  id,
  queryParams,
  cache = "no-cache",
  revalidate,
  tags,
}: {
  resourceName: ResourceNameProps;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  id?: string;
  queryParams?: URLSearchParams;
  cache?: RequestCache;
  revalidate?: number; // Revalidation time in seconds
  tags?: string[]; // Tags for revalidation
}) => {
  try {
    // Construct the URL with query parameters
    const url = new URL(`${API_URL}/${resourceName}${id ? `/${id}` : ""}`);
    if (queryParams) {
      queryParams.forEach((value, key) => {
        url.searchParams.append(key, value);
      });
    }

    // Fetch data
    const res = await fetch(url.toString(), {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      cache, // Cache control
      next: {
        revalidate, // Revalidation time
        tags, // Tags for revalidation
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${resourceName}: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${resourceName}:`, error);
    throw error;
  }
};
