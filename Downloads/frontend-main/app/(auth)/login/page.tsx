import Login from "@/app/components/Login";
import Image from "next/image";

const Page = () => {
  return (
    <section className="min-h-screen  flex items-stretch ">
      <Login />
      <div
        style={{
          backgroundImage: "url(/login.gif)",
          backgroundSize: "contain",
         
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className=" hidden md:block md:w-[40%] lg:w-[60%]  min-h-full relative"
      />
    </section>
  );
};

export default Page;
