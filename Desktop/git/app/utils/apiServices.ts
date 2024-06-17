import { toast } from "react-toastify";

export const getProductVariance = async (id: string) => {
  const response = await fetch("https://devapiv2.exanor.com/api/v1/product-variation-value/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: "7688b96a-5857-488d-a402-c8f02d3f47b0",
      order_by: "variation_name",
      query: { store_id: "a5fc3b5c-07d5-4c89-bd12-b6dfd66b93b7", product_id: id },
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch product data");
  }

  return response.json();
};
export async function validateProductAvailability(variations: [string], product_id: string, quantity: number) {
  const endpoint = "https://devapiv2.exanor.com/api/v1/validate-product-availability/";
  const payload = {
    user_id: "7688b96a-5857-488d-a402-c8f02d3f47b0",
    variations: variations,
    quantity: quantity,
    store_id: "a5fc3b5c-07d5-4c89-bd12-b6dfd66b93b7",
    product_id: product_id,
  };

  try {
    console.log(variations, quantity, product_id);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Failed to validate product availability:", error);
    return null;
  }
}
export async function SearchProducts(query: string) {
  const endpoint = "https://devapiv2.exanor.com/api/v1/search-in-store/";
  const payload = {
    user_id: "7688b96a-5857-488d-a402-c8f02d3f47b0",
    query: query,
    store_id: "a5fc3b5c-07d5-4c89-bd12-b6dfd66b93b7",
  };

  try {
    console.log(query);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("falied to find a product with this name", error);
    return null;
  }
}
