import ProductSection from "./product-section";

// Sample product data - in a real app, this would come from an API or database
const sampleProduct = {
  id: "silver-pearl-necklace",
  title: "عقد فضة اصلي تصميم مع دمج اللؤلؤ الطبيعي",
  price: 190.54,
  originalPrice: 249,
  discount: 50,
  rating: 4,
  reviewCount: 32,
  description: `لوريم إيبسوم ألم سيت أميت، كونسيكتيور أديبي سكينج إليت، سيد ديام نونومي نيبه إيسمود تينسيدونت أوت لاوريت دولور ماجن. لوريم إيبسوم ألم سيت أميت، كونسيكتيور أديبي سكينج إليت، سيد ديام نونومي نيبه إيسمود تينسيدونت أوت لاوريت دولور ماجن. لوريم إيبسوم ألم سيت أميت، أديبي سكينج إليت لوريم إيبسوم ألم سيت أميت، كونسيكتيتور أديبي سكينج إليت لوريم إيبسوم ألم سيت أميت، كونسيكتيتور أديبي سكينج إليت`,
  images: [
    {
      src: "/Frame 1000005447.svg",
      alt: "Silver pearl necklace front view",
    },
    {
      src: "/Frame 1000005520.svg",
      alt: "Silver pearl necklace side view",
    },
    {
      src: "/Frame 1000005521.svg",
      alt: "Silver pearl necklace detail view",
    },
    {
      src: "/Frame 1000005466.svg",
      alt: "Silver pearl necklace worn",
    },
  ],
  sizes: ["صغير", "متوسط", "كبير"],
  weights: ["2 جرام", "3 جرام", "4 جرام"],
  reviews: [
    {
      name: "مايك جونسون",
      avatar: "/CommenterAvatar.png",
      review: "لوريم إيبسوم ألم سيت أميت، كونسيكتيور أديبي سكينج إليت...",
      images: ["/Frame 1261155013.png", "/Frame 1000005520 (1).png", "/Frame 1000005520 (1).png"],
      rating: 5,
    },
    {
      name: "أحمد علي",
      avatar: "/CommenterAvatar (1).png",
      review: "خدمة ممتازة وسرعة في التوصيل!",
      images: ["/Frame 1261155013.png", "/Frame 1000005520 (1).png", "/Frame 1000005520 (1).png"],
      rating: 4,
    },
  ],
};

/**
 * Product Detail Page
 * Displays a single product with all its details
 */
const ProductPage = () => {
  return (
    <div className=" font-display">
      <ProductSection product={sampleProduct} rtl={true} />
    </div>
  );
};

export default ProductPage;
