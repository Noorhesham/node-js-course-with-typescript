import Hero from "./components/Hero";
import Products from "./components/Products";

export default async function Home() {
  const data = await fetch("https://devapiv2.exanor.com/api/v1/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: "876e164b-eaba-4539-bf50-9729e7d6a17f",
      store_id: "a5fc3b5c-07d5-4c89-bd12-b6dfd66b93b7",
      query: {},
      order_by: "-ranking_score",
    }),
  }).then((res) => res.json());

  return (
    <main className="">
      {/* <Hero /> */}
      <Products products={data.response} />
    </main>
  );
}
