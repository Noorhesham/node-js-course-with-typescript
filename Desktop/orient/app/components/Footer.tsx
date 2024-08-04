import React from "react";
import Logo from "./Logo";
import { Phone, HeadPhones, Google, Apple, PayPal } from "./Icons";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className=" relative bg-main2  ">
        <div className=" relative z-10  items-center py-10 lg:py-20 lg:pt-28 md:pt-20 pt-10 xl:pt-32 px-10 md:px-16 lg:px-28 xl:px-32">
          <div className=" border-b border-gray-400 pb-5 grid gap-10 lg:gap-20 xl:gap-32  grid-cols-5 xl:grid-cols-8">
            <div className=" col-span-full md:col-span-3 flex gap-4 flex-col">
              <Logo />
              <div className=" flex items-center gap-3">
                <Phone /> <p className=" ml-2 tracking-wide text-white text-3xl font-[600]">19842</p>
              </div>
              <div className=" flex items-start gap-3 ">
                <HeadPhones />
                <div className="text-white flex gap-1 flex-col">
                  <p className=" ml-2 tracking-wide  text-xl font-[500]">HEED OFFICE</p>
                  <div className="ml-2  flex  gap-3 items-center text-[14px]">
                    <p>Head Office Maadi, Cairo.</p>
                    <p className=" py-1 px-4 w-fit text-xs bg-gray-400/40 rounded-full">Show Map</p>
                  </div>
                </div>
              </div>
              <div className=" flex items-start gap-3 ">
                <HeadPhones />
                <div className="text-white flex gap-1 flex-col">
                  <p className=" ml-2 tracking-wide  text-xl font-[500]">Factory</p>
                  <div className="ml-2  flex  gap-3 items-center text-[14px]">
                    <p>Head Office Maadi, Cairo.</p>
                    <p className=" py-1 px-4 w-fit text-xs bg-gray-400/40 rounded-full">Show Map</p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" ml-5  col-span-full md:col-span-2 text-gray-50">
              <p>ABOUT ORIENT</p>
              <ul className=" flex flex-col mt-10 gap-3">
                <li>HOME</li>
                <li>ABOUT US</li>
                <li>PRODUCTS</li>
                <li>COLOR TREND</li>
                <li>EXPORT</li>
                <li>GET INSPIRED</li>
              </ul>
            </div>

            <div className="  col-span-full xl:col-span-3 pb-10  flex gap-5 flex-col">
              <div>
                <p className=" text-white">DOWNLOAD APP</p>
                <div className=" flex items-center gap-3 mt-5">
                  <Google />
                  <Apple />
                </div>
                <div className=" mt-5">
                  <p className=" text-white">FOLLOW US</p>
                  <div className=" flex mt-5 items-center gap-2">
                    <span className=" text-white p-2 text-xl rounded-full bg-main">
                      <FaWhatsapp />
                    </span>
                    <span className=" text-white p-2 text-xl rounded-full bg-main">
                      <FaLinkedin />
                    </span>
                    <span className=" text-white p-2 text-xl rounded-full bg-main">
                      <FaYoutube />
                    </span>
                    <span className=" text-white p-2 text-xl rounded-full bg-main">
                      <FaInstagram />
                    </span>
                    <span className=" text-white p-2 text-xl rounded-full bg-main">
                      <FaFacebook />
                    </span>
                    <span className=" text-white p-2 text-xl rounded-full bg-main">
                      <FaXTwitter />
                    </span>
                  </div>
                  <div className="  flex   flex-wrap xl:grid xl:grid-cols-8 mt-5 items-center gap-2">
                    <span className=" text-white  py-1 px-2 text-xl rounded-xl bg-white">
                      <PayPal />
                    </span>
                    <span className=" text-white  py-1 px-2 text-xl rounded-xl bg-white">
                      <PayPal />
                    </span>
                    <span className=" text-white  py-1 px-2 text-xl rounded-xl bg-white">
                      <PayPal />
                    </span>
                    <span className=" text-white  py-1 px-2 text-xl rounded-xl bg-white">
                      <PayPal />
                    </span>
                    <span className=" text-white  py-1 px-2 text-xl rounded-xl bg-white">
                      <PayPal />
                    </span>
                    <span className=" text-white  py-1 px-2 text-xl rounded-xl bg-white">
                      <PayPal />
                    </span>
                    <span className=" text-white  py-1 px-2 text-xl rounded-xl bg-white">
                      <PayPal />
                    </span>
                    <span className=" text-white  py-1 px-2 text-xl rounded-xl bg-white">
                      <PayPal />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="  grid grid-cols-3 lg:grid-cols-6 justify-center mx-auto pt-5">
            <Image src="/12 1.svg" alt="logo" width={150} height={150} />
            <Image src="/12 1.svg" alt="logo" width={150} height={150} />
            <Image src="/12 1.svg" alt="logo" width={150} height={150} />
            <Image src="/12 1.svg" alt="logo" width={150} height={150} />
            <Image src="/12 1.svg" alt="logo" width={150} height={150} />
            <Image src="/12 1.svg" alt="logo" width={150} height={150} />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
