import About from "../components/About";
import Hero from "../components/Hero";
import ImageGrid from "../components/ImageGrid";
import Levels from "../components/Levels";
import MoreInfo from "../components/MoreInfo";

export default function Home() {
  return (
    <main className=" w-full h-full overflow-x-hidden">
      <Hero />
      <MoreInfo />
      <About />
      <Levels />
      <ImageGrid
        images={[
          "/photo_2024-08-21_14-18-31.jpg",
          "/123A2060.JPG",
          "/123A2066.JPG",
          "/123A2180.JPG",
          "/123A2259.JPG",
          "/123A2320.JPG",
        ]}
      />
    </main>
  );
}
