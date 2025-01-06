import Image from "next/image";

const SecondScene = () => {
  return (
    <section className=" lg:flex hidden h-screen z-50 bg  items-center w-full x-screen absolute">
      <h2 className=" text-[12vw] z-[51] -top-10 right-mind  text-white   absolute right-10">RIGHT MIND</h2>{" "}
      <div className=" flex slideshow   w-full translate-x-[20%] top-40  gap-10 py-10 px-20">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} style={{ zIndex: index % 2 === 0 ? "52" : "48" }} className="  w-full aspect-square relative  h-[37rem]">
            <Image fill className=" object-cover" src="/img2.webp" alt="" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecondScene;
