import { useTranslations } from "next-intl";

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

export const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 4:
      return { score, label: "Strong", color: "bg-green-500", text: "text-green-500" };
    case 3:
      return { score, label: "Good", color: "bg-yellow-500", text: "text-yellow-500" };
    case 2:
      return { score, label: "Fair", color: "bg-orange-500", text: "text-orange-500" };
    default:
      return { score, label: "Weak", color: "bg-red-500", text: "text-red-500" };
  }
};
export function getYouTubeThumbnail(url: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (match) {
    const videoId = match[1];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return "";
}
