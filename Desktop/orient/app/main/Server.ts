import { cookies } from "next/headers";
const BASE_URL = "http://localhost:3000";
//function to get the full url from the resource name
const getURL = (resourceName: string) => {
  switch (resourceName) {
    // in each case i write the original cases (from the server)
    case "user":
      return `${BASE_URL}/users`;
    case "posts":
      return `${BASE_URL}/posts`;
    // Add more cases as needed
    default:
      return BASE_URL;
  }
};
export type MethodProps = "GET" | "POST" | "PUT" | "DELETE";
export type ResourceNameProps = "user" | "posts"; //types the user allowed to add its resource
export async function Server({ resourceName, method }: { resourceName: ResourceNameProps; method: MethodProps }) {
  try {
    //get the token from cookies to send along with every request to the server
    const jwt = await cookies().get("jwt")?.value;
    const response = await fetch(getURL(resourceName), {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(getURL(resourceName), jwt);
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Server request error:", error);
    throw error;
  }
}
