export function formatPrice(
  price: number | string,
  options: { currency?: "EGP"; notation?: Intl.NumberFormatOptions["notation"] } = {}
) {
  const { currency = "EGP", notation = "compact" } = options;
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
export const uploadImageToCloudinary = async (file: File | Blob) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");

  const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  return response.json(); // Returns { secure_url, public_id }
};
