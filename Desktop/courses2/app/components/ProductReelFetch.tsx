import React from "react";
import { unstable_cache } from "next/cache";
// import { getCourses, getEntities } from "../actions/actions";
import ProductCard from "./Product";
import GridContainer from "./defaults/GridContainer";
import { PaginationDemo } from "./Pagination";
import ToolBox from "./ToolBox";
import Empty from "./Empty";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";

// const fetchProducts = async (page = 1, filter = "", locale = "en") => {
//   return await getEntities("Course", page, filter, false, locale);
// };

// const cachedFetchProducts = (page: number, filter: any, locale?: string) =>
//   unstable_cache(() => fetchProducts(page, filter, locale), [`products-${page}-${JSON.stringify(filter)}-${locale}`], {
//     revalidate: 1,
//   });
const courses = [
  {
    _id: 1,
    name: "Introduction to React",
    category: { name: { en: "Web Development", ar: "تطوير الويب" } },
    price: 100,
    description: "Learn the basics of React.",
    images: [{ secure_url: "/react-thumbnail.jpg" }],
    stock: 10,
  },
  {
    _id: 2,
    name: "Advanced React Patterns",
    category: { name: { en: "Web Development", ar: "تطوير الويب" } },
    price: 120,
    description: "Explore advanced concepts in React.",
    images: [
      {
        secure_url:
          "/68747470733a2f2f6b656e7463646f6464732e636f6d2f696d616765732f6570696372656163742d70726f6d6f2f65722d312e676966.gif",
      },
      {
        secure_url: "/Backend-Development.webp",
      },
    ],
    stock: 8,
  },
  {
    _id: 3,
    name: "Node.js for Beginners",
    category: { name: { en: "Backend Development", ar: "تطوير الخلفية" } },
    price: 90,
    description: "Get started with Node.js.",
    images: [{ secure_url: "/Backend-Development.webp" }],
    stock: 12,
  },
  {
    _id: 4,
    name: "Mastering MongoDB",
    category: { name: { en: "Database", ar: "قاعدة البيانات" } },
    price: 110,
    description: "Learn to work with MongoDB databases.",
    images: [{ secure_url: "/1_r2W3HDpVUr3dLyws2F7ZBA - Copy.jpg" }],
    stock: 15,
  },
  {
    _id: 5,
    name: "JavaScript Essentials",
    category: { name: { en: "Web Development", ar: "تطوير الويب" } },
    price: 85,
    description: "Master the essentials of JavaScript.",
    images: [{ secure_url: "/NodeJS.jpg" }],
    stock: 20,
  },
  {
    _id: 6,
    name: "TypeScript Fundamentals",
    category: { name: { en: "Web Development", ar: "تطوير الويب" } },
    price: 95,
    description: "Understand the basics of TypeScript.",
    images: [{ secure_url: "/hacker-python.gif" }],
    stock: 13,
  },
  {
    _id: 7,
    name: "GraphQL for Developers",
    category: { name: { en: "Web Development", ar: "تطوير الويب" } },
    price: 130,
    description: "Learn how to implement GraphQL.",
    images: [{ secure_url: "/0_Wd8dX6fY35LN5HjJ.png" }],
    stock: 9,
  },
  {
    _id: 8,
    name: "Docker Essentials",
    category: { name: { en: "DevOps", ar: "ديف أوبس" } },
    price: 140,
    description: "Master Docker and containerization.",
    images: [{ secure_url: "/1677088482093.png" }],
    stock: 5,
  },
  {
    _id: 9,
    name: "Python for Data Science",
    category: { name: { en: "Data Science", ar: "علوم البيانات" } },
    price: 150,
    description: "Get started with Python for data analysis.",
    images: [
      { secure_url: "/1692105615355.jpeg" },
      { secure_url: "/authentication-vs-authorization-social-media-image-for-Heimdal-2.png" },
    ],
    stock: 11,
  },
  {
    _id: 10,
    name: "Machine Learning with Python",
    category: { name: { en: "Artificial Intelligence", ar: "الذكاء الاصطناعي" } },
    price: 180,
    description: "Learn machine learning with Python.",
    images: [{ secure_url: "/authentication-vs-authorization-social-media-image-for-Heimdal-2.png" }],
    stock: 6,
  },
  {
    _id: 11,
    name: "Flutter for Mobile Apps",
    category: { name: { en: "Mobile Development", ar: "تطوير التطبيقات" } },
    price: 125,
    description: "Build mobile apps with Flutter.",
    images: [{ secure_url: "/banner-Amsterdam.webp" }],
    stock: 7,
  },
  {
    _id: 12,
    name: "Fullstack with MERN",
    category: { name: { en: "Web Development", ar: "تطوير الويب" } },
    price: 200,
    description: "Master fullstack development with MERN.",
    images: [{ secure_url: "/training-courses-2025.webp" }],
    stock: 10,
  },
];

const ProductReelFetch = async ({
  page = 1,
  filter = {},
  locale = "en",
}: {
  page: number;
  filter: any;
  locale?: string;
}) => {
  // Use the cached function to fetch products with the specific page and filter,
  // const res = await cachedFetchProducts(page, filter, locale)();
  // console.log(res);
  // if (!res || !res.data) {
  //   return null; // Handle the case where the response is invalid or empty
  // }

  // const { data, totalPages } = res.data;
  // const courses = data;
  // console.log(courses);
  return (
    <section className=" pt-32">
      <MaxWidthWrapper className="flex flex-col items-center gap-5">
        <h1 className="text-6xl  font-bold text-black ">Courses</h1>
        {/* <ToolBox /> */}
        <GridContainer cols={3}>
          {courses.length > 0 ? (
            <>
              {courses.map((product: any, i: number) => (
                <ProductCard index={i} key={product.id} product={product} />
              ))}
            </>
          ) : (
            <Empty />
          )}
          <PaginationDemo totalPages={4} />
        </GridContainer>
      </MaxWidthWrapper>
    </section>
  );
};

export default ProductReelFetch;
