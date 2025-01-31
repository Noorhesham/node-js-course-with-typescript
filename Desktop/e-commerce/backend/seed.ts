import { faker } from "@faker-js/faker";
import mongoose, { disconnect } from "mongoose";
import { Product } from "./models/Product";
import { Category } from "./models/Category";
import { Variant } from "./models/Variant";

const NUM_CATEGORIES = 10;
const NUM_PRODUCTS = 250;
const VARIANTS_PER_PRODUCT = { min: 2, max: 5 };

const generateVariantTypes = async () => {
  const variantTypes = [
    {
      name: "Color",
      slug: "product-colors",
      type: "color",
      values: ["Red", "Blue", "Green", "Black", "White", "Gray", "Navy", "Yellow"],
    },
    {
      name: "Size",
      slug: "product-sizes",
      type: "size",
      values: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      name: "Gender",
      slug: "product-genders",
      type: "gender",
      values: ["Male", "Female", "Unisex", "Kids"],
    },
  ];

  return Promise.all(
    variantTypes.map(async (typeData) => {
      let variantType = await Variant.findOne({ slug: typeData.slug });
      if (!variantType) {
        variantType = await Variant.create(typeData);
      }
      return variantType;
    })
  );
};

const generateCategories = async () => {
  const categories = [];
  const parentCategories = ["Clothing", "Shoes", "Accessories", "Electronics"];

  // Create parent categories
  for (const name of parentCategories) {
    const category = await Category.create({
      name,
      slug: faker.helpers.slugify(name).toLowerCase(),
      description: faker.commerce.productDescription(),
      image: {
        secure_url: faker.image.urlLoremFlickr({ category: "fashion" }),
        publicId: faker.string.uuid(),
      },
    });
    categories.push(category);
  }

  // Create subcategories
  const subcategories = [
    { parent: "Clothing", name: "Men's Clothing" },
    { parent: "Clothing", name: "Women's Clothing" },
    { parent: "Shoes", name: "Men's Shoes" },
    { parent: "Shoes", name: "Women's Shoes" },
    { parent: "Accessories", name: "Kids' Accessories" },
  ];

  for (const { parent, name } of subcategories) {
    //@ts-ignore
    const parentCat = categories.find((c) => c.name === parent);
    //@ts-ignore
    const category = await Category.create({
      name,
      slug: faker.helpers.slugify(name).toLowerCase(),
      description: faker.commerce.productDescription(),
      parent: parentCat?._id,
      image: {
        secure_url: faker.image.urlLoremFlickr({ category: "fashion" }),
        publicId: faker.string.uuid(),
      },
    });
    categories.push(category);
  }

  return categories;
};
//@ts-ignore

const generateProduct = async (categories, variantTypes) => {
  const category = faker.helpers.arrayElement(categories);
  const productName = faker.commerce.productName();

  // Generate a unique slug
  let slug = faker.helpers.slugify(productName).toLowerCase();
  let isSlugUnique = false;
  let attempts = 0;

  while (!isSlugUnique && attempts < 5) {
    const existingProduct = await Product.findOne({ slug });
    if (!existingProduct) {
      isSlugUnique = true;
    } else {
      // Append a random string to the slug to make it unique
      slug = `${slug}-${faker.string.alphanumeric(5).toLowerCase()}`;
      attempts++;
    }
  }

  if (!isSlugUnique) {
    throw new Error(`Failed to generate a unique slug for product: ${productName}`);
  }

  // Base product data
  const productData = {
    name: productName,
    slug,
    description: faker.commerce.productDescription(), //@ts-ignore

    category: category._id,
    //@ts-ignore
    gender: category.name.includes("Men") ? "male" : category.name.includes("Women") ? "female" : "kids",
    basePrice: 0,
    brand: faker.helpers.arrayElement(["Nike", "Adidas", "Puma", "Levi's", "Gucci", "Zara"]),
    variants: [],
  };

  // Generate variants
  const numVariants = faker.number.int(VARIANTS_PER_PRODUCT);
  for (let i = 0; i < numVariants; i++) {
    //@ts-ignore

    const price = faker.number.float({ min: 20, max: 500, precision: 0.01 });

    // Generate variant options
    //@ts-ignore

    const variantOptions = variantTypes.map((variantType) => ({
      name: variantType.name,
      value: faker.helpers.arrayElement(variantType.values),
    }));

    const variant = {
      options: variantOptions,
      sku: `${productData.slug}-${i + 1}-${faker.string.alphanumeric(4)}`.toUpperCase(),
      price,
      compareAtPrice: faker.datatype.boolean() ? price * faker.number.float({ min: 1.2, max: 2 }) : undefined,
      inventory: faker.number.int({ min: 0, max: 1000 }),
      images: [
        {
          secure_url: faker.image.urlLoremFlickr({ category: "fashion" }),
          publicId: faker.string.uuid(),
        },
      ],
      isActive: faker.datatype.boolean({ probability: 0.9 }),
    };
    //@ts-ignore

    productData.variants.push(variant);
  }

  // Set base price to lowest variant price
  //@ts-ignore

  productData.basePrice = Math.min(...productData.variants.map((v) => v.price));

  return Product.create(productData);
};

export const seed = async () => {
  try {
    const DB_URI = process.env.DATABASE_URI || "";
    await mongoose.connect(DB_URI);
    console.log("Connected to database");

    // Clear existing data
    await Promise.all([Product.deleteMany(), Category.deleteMany(), Variant.deleteMany()]);
    console.log("Database cleared");

    // Generate variant types
    const variantTypes = await generateVariantTypes();
    console.log(`Generated ${variantTypes.length} variant types`);

    // Generate categories
    const categories = await generateCategories();
    console.log(`Generated ${categories.length} categories`);

    // Generate products
    const productPromises = Array.from({ length: NUM_PRODUCTS }, () => generateProduct(categories, variantTypes));
    const products = await Promise.all(productPromises);
    console.log(`Generated ${products.length} products`);

    await disconnect();
    console.log("Disconnected from database");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seed();
