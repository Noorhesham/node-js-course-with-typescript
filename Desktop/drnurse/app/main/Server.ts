"use server";
import { cookies } from "next/headers";

// Constants
const BASE_URL = "https://lab.r-m.dev/api";
const VERSION = "v1";

// Types for Method and Resource Names
export type MethodProps = "GET" | "POST" | "PUT" | "DELETE";
export type ResourceNameProps =
  | "user"
  | "posts"
  | "login"
  | "signup"
  | "MGS"
  | "reset"
  | "verify"
  | "validate"
  | "token"
  | "logout"
  | "tfaSend"
  | "tfaValidate"
  | "update_password"
  | "update_profile"
  | "remove_account"
  | "tfaActivate"
  | "getDevices"
  | "deviceLogout"
  | "languageUpdate"
  | "getEntity"
  | "getSingleEntity";

// Function to get the full URL from the resource name
const getURL = (resourceName: ResourceNameProps, id?: string, entityName?: string) => {
  const url = BASE_URL;
  switch (resourceName) {
    case "user":
      return { url: `${url}/rm_users`, method: "GET" as MethodProps };
    case "login":
      return { url: `${url}/rm_users/${VERSION}/create_authentication`, method: "POST" };
    case "signup":
      return { url: `${url}/rm_users/${VERSION}/registration`, method: "POST" };
    case "posts":
      return { url: `${url}/posts`, method: "GET" };
    case "MGS":
      return { url: `${url}/rm_users/${VERSION}/start_app`, method: "POST" };
    case "reset":
      return { url: `${url}/rm_users/${VERSION}/forget_password`, method: "POST" };
    case "verify":
      return { url: `${url}/rm_users/${VERSION}/account_verification/${id}/send`, method: "POST" };
    case "validate":
      return { url: `${url}/rm_users/${VERSION}/account_verification/${id}/validate`, method: "POST" };
    case "token":
      return { url: `${url}/rm_users/${VERSION}/authentication`, method: "POST" };
    case "logout":
      return { url: `${url}/rm_users/${VERSION}/log_out`, method: "POST" };
    case "tfaSend":
      return { url: `${url}/rm_users/${VERSION}/tfa/${id}/send`, method: "POST" };
    case "tfaActivate":
      return { url: `${url}/rm_users/${VERSION}/tfa/activate`, method: "POST" };
    case "tfaValidate":
      return { url: `${url}/rm_users/${VERSION}/tfa/${id}/validate`, method: "POST" };
    case "update_profile":
      return { url: `${url}/rm_users/${VERSION}/update_profile`, method: "POST" };
    case "update_password":
      return { url: `${url}/rm_users/${VERSION}/update_password`, method: "POST" };
    case "remove_account":
      return { url: `${url}/rm_users/${VERSION}/remove_account`, method: "POST" };
    case "getDevices":
      return { url: `${url}/rm_users/${VERSION}/devices/get`, method: "GET" };
    case "deviceLogout":
      return { url: `${url}/rm_users/${VERSION}/devices/stop`, method: "POST" };
    case "languageUpdate":
      return { url: `${url}/rm_users/${VERSION}/device_sys`, method: "POST" };
    case "getEntity":
      return { url: `${url}/${entityName}/entities-operations`, method: "GET" };
    case "getSingleEntity":
      return { url: `${url}/${entityName}/entities-operations/${id}`, method: "GET" };
    default:
      return { url, method: "GET" as MethodProps };
  }
};

// Server Request Function
export async function Server({
  resourceName,
  id,
  method,
  body,
  headers,
  noHeaders = false,
  cache = false,
  img = false,
  entityName,
}: {
  resourceName: ResourceNameProps;
  id?: string;
  method?: MethodProps;
  body?: any;
  headers?: any;
  noHeaders?: boolean;
  cache?: boolean;
  img?: boolean;
  entityName?: string;
}) {
  try {
    // Get the token and device info from cookies
    const jwt = cookies().get("jwt")?.value;
    const deviceId = cookies().get("deviceInfo")?.value;

    // Set up headers
    const combinedHeaders: { [key: string]: string } = {
      "Content-Type": img ? "multipart/form-data" : "application/json",
      ...headers,
    };

    if (jwt && jwt !== "undefined" && !noHeaders) {
      combinedHeaders.Authorization = `Bearer ${jwt}`;
    }
    if (deviceId) {
      combinedHeaders["device-unique-id"] = JSON.parse(deviceId).device_unique_id;
    }

    // Get the URL and method from the resource name
    const { url, method: resolvedMethod } = getURL(resourceName, id, entityName);
    // Fetch data from the server
    const response = await fetch(url, {
      method: method || resolvedMethod,
      headers: combinedHeaders,
      body: body && !img ? JSON.stringify(body) : img ? body : undefined,
      cache: "no-cache",
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    console.log(data, body);
    return data;
  } catch (error: any) {
    console.error("Server request error:", error);
    throw new Error(`Error: ${error.message}`);
  }
}
