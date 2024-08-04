import React from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import Image from "next/image";
import { PlayIcon } from "../../../components/Icons";
import SwiperCards from "../../../components/SwiperCards";

const page = () => {
  return (
    <>
      <BreadCrumb />
      <section className=" relative min-h-screen">
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url('/about.png')`,
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className={`reveal_animation absolute inset-0 `}
        />
        <h1 className=" text-[8rem] font-bold z-10  text-main capitalize absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          ABOUT US
        </h1>
      </section>
      <MaxWidthWrapper>
        <section className=" mt-10">
          <div className=" flex items-center">
            <div className="flex max-w-2xl flex-col gap-4">
              <h1 className=" text-main uppercase text-4xl font-bold">our history</h1>
              <p className="text-[14px] text-black">
                Founded in 1946, Orient is built on a legacy of integrity, quality assurance, and innovative technology.
                With a continuous effort to hold a unique leading position in the industry, Orient brings together
                Egyptian manufacturing and German technology to offer products that you can rely on and a name you can
                trust.
              </p>
              <p className="text-[14px] max-w-[30rem] text-gray-900">
                Founded in 1946, Orient is built on a legacy of integrity, quality assurance, and innovative technology.
                With a continuous effort to hold a unique leading position in the industry, Orient brings together
                Egyptian manufacturing and German technology to offer products that you can rely on and a name you can
                trust.
              </p>
            </div>
            <div className="  flex-grow w-[461px] h-[616px] relative ">
              <Image src="/about1.png" alt="about" className=" object-cover" fill />
              <Image
                src="/about2.png"
                alt="about"
                width={348}
                height={297}
                className=" absolute -left-20 top-[19rem]"
              />
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
      <div className=" h-[571px] w-full relative">
        <div className=" absolute  bottom-10 left-40 -translate-x-1/2 -translate-y-1/2 z-10">
          <PlayIcon />
        </div>
        <Image src="/about3.png" alt="about" className=" object-contain" fill />
      </div>
      <MaxWidthWrapper className=" mt-[138px]">
        <div className="flex gap-4 items-center">
          <div className="min-w-[576px] flex-grow h-[200px] relative">
            <Image src="/About Oud 2.jpg" alt="about" className=" object-cover" fill />
          </div>
          <div className=" flex-shrink flex flex-col gap-2">
            <h1 className=" text-3xl font-bold text-main">OUR VISION</h1>
            <p className=" text-black text-sm  ">
              Donec mattis porta eros, aliquet finibus ri sus interdum at. Nulla vivethe as it was Donec mattis porta
              eros, aliquet finibus risus interdum at. Nulla vivethe as it wasDonec mattis porta eros, aliquet finibus
              risus interdum at. Nulla vivethe as it was
            </p>
          </div>
        </div>

        <div className="flex mt-5 gap-4 items-center">
          <div className=" flex-shrink flex flex-col gap-2">
            <h1 className=" text-3xl font-bold text-main">OUR VISION</h1>
            <p className=" text-black text-sm  ">
              Donec mattis porta eros, aliquet finibus ri sus interdum at. Nulla vivethe as it was Donec mattis porta
              eros, aliquet finibus risus interdum at. Nulla vivethe as it wasDonec mattis porta eros, aliquet finibus
              risus interdum at. Nulla vivethe as it was
            </p>
          </div>
          <div className="min-w-[576px] flex-grow h-[200px] relative">
            <Image src="/About Oud 2.jpg" alt="about" className=" object-cover" fill />
          </div>
        </div>

        <div className="flex mt-5 mb-10 gap-4 items-end">
          <div className=" flex-grow  relative">
            <h1 className=" text-main2 text-5xl font-semibold">OUR</h1>
            <h1 className=" text-main2 text-5xl font-semibold">CERTIFICATES</h1>
          </div>
          <div className=" flex-shrink flex flex-col gap-2">
            <p className=" text-black text-sm  ">
              Donec mattis porta eros, aliquet finibus ri sus interdum at. Nulla vivethe as it was Donec mattis porta
              eros, aliquet finibus risus interdum at. Nulla vivethe as it wasDonec mattis porta eros, aliquet finibus
              risus interdum at. Nulla vivethe as it was
            </p>
          </div>
        </div>
        <div className=" mt-8 flex pb-10 border-main border-b-2  justify-between items-center ">
          <div className=" w-24 aspect-square  relative">
            <Image src={"/Vector Smart Object 1.png"} alt="Vector Smart" className=" object-contain" fill />
          </div>
          <div className=" w-24 aspect-square  relative">
            <Image
              src={"/PROUDLY MADE IN EGYPT بكل فخر صنع في مصر 23-02 1.png"}
              alt="PROUDLY MADE IN EGYPT بكل فخر صنع في مصر 23-02 1.png"
              className=" object-contain"
              fill
            />
          </div>
          <div className=" w-24 aspect-square  relative">
            <Image src={"/klml 1.png"} alt="/klml 1.png" className=" object-contain" fill />
          </div>
          <div className=" w-24 aspect-square  relative">
            <Image src={"/t 1.png"} alt="/t 1.png" className=" object-contain" fill />
          </div>
          <div className=" w-24 aspect-square  relative">
            <Image src={"/12 1.png"} alt="/12 1.png" className=" object-contain" fill />
          </div>
          <div className=" w-24 aspect-square  relative">
            <Image src={"/2 5001.png"} alt="2 5001.png" className=" object-contain" fill />
          </div>
          <div className=" w-24 aspect-square  relative">
            <Image src={"/eos_logo 1.png"} alt="es logo" className=" object-contain" fill />
          </div>
        </div>
        <div className=" py-10">
          <div className="flex mt-5 mb-10 gap-4 items-end">
            <div className=" flex-grow  relative">
              <h1 className=" text-main2 text-5xl font-semibold">OUR</h1>
              <h1 className=" text-main2 text-5xl font-semibold">PARTENERS</h1>
            </div>
            <div className=" flex-shrink flex flex-col gap-2">
              <p className=" text-black text-sm  ">
                Founded in 1946, Orient is built on a legacy of integrity, quality assurance, and innovative technology.
                With a continuous effort to hold a unique leading position in the industry,
              </p>
            </div>
          </div>

          <div className=" justify-center  flex items-center">
            <SwiperCards
              btns={true}
              spaceBetween={50}
              slidesPerView={5}
              className="max-w-[150px] aspect-square rounded-full"
              items={[
                "/Artboard-1@300x-1.png",
                "/Artboard-1@300x-1 (1).png",
                "/Artboard-1@300x-1 (2).png",
                "/Artboard-1@300x-1 (3).png",
                "/Artboard-1@300x-1 (4).png",
                "/Frame 1321317235.png",
              ]}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default page;
