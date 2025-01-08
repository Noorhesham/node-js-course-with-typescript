import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";

const SecondScene = () => {
  const projectsRefs = useRef<HTMLDivElement[] | any>([]);

  return (
    <section className=" lg:flex hidden h-[120vh] z-50 bg  items-center w-full x-screen absolute">
      <h2 className=" text-[14vw] z-[51] xl:-top-12 top-0 right-mind  text-white   absolute right-10">RIGHT MIND</h2>{" "}
      <MaxWidthWrapper className=" flex slideshow   w-full  top-40  gap-10 py-10 px-20">
        {Array.from({ length: 4 }).map((_, index) => (
          <Link
            href={"/"}
            ref={(el) => {
              //storing all my divs in an array of refs
              if (el) projectsRefs.current[index] = el;
            }}
            onMouseOver={() =>
              gsap
                .timeline({ defaults: { ease: "power2.out" } })
                .to(projectsRefs.current[index].querySelector(".circle2") as HTMLDivElement, { scale: 1.4 })
                .to(projectsRefs.current[index].querySelector(".imgproject"), { scale: 1.2 }, "<")
            }
            onMouseLeave={() =>
              gsap
                .timeline()
                .to(projectsRefs.current[index].querySelector(".circle2") as HTMLDivElement, { scale: 1 })
                .to(projectsRefs.current[index].querySelector(".imgproject"), { scale: 1 }, "<")
            }
            key={index}
            style={{ zIndex: index % 2 === 0 ? "52" : "48" }}
            className="     aspect-square relative   w-full  h-[37rem]"
          >
            <div className=" circle2 w-20 h-20 absolute flex top-1/2 -translate-y-1/2  justify-center items-center z-[55] rounded-full bg-main left-1/2 -translate-x-1/2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.152 6.13025H15.0425V9.26675H9.152V15.3867H5.939V9.26675H0.125V6.13025H5.939V0.125H9.152V6.13025Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className=" absolute inset-0 w-full h-full overflow-hidden">
              <Image fill className="imgproject object-cover" src="/img2.webp" alt="" />
            </div>
            <h2 className=" uppercase text-black text-3xl font-semibold lg:text-5xl absolute -bottom-5 left-10">
              allcon
            </h2>
          </Link>
        ))}
      </MaxWidthWrapper>
    </section>
  );
};

export default SecondScene;
