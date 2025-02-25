import Logo from "@/components/Logo";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import SpcialButton from "@/components/SpcialButton";
import AnimatedSvgQ from "@/components/SvgQ";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export const HomeSlide = () => {
  return (
    <div className="min-h-screen  flex justify-center relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-main2 z-20 mix-blend-multiply" />
      <div className=" absolute inset-0 w-full h-full bg-white/30 z-10"></div>
      <video src="/pattern v03.mp4" loop autoPlay muted className="absolute   inset-0 w-full h-full object-cover" />
      <div className=" absolute left-0 top-0 w-96">
        <AnimatedSvgQ />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
          },
        }}
        className=" z-30 h-fit m-auto"
      >
        {" "}
        <MaxWidthWrapper className="flex flex-col z-30 items-center justify-center  m-auto gap-8 relative">
          <Logo col size=" w-96" />
          <div className="flex md:flex-row flex-col  items-stretch gap-10">
            <Link to={"/about"}>
              <SpcialButton>
                <span>من نحن</span>
                <span className="special-font">About us</span>
              </SpcialButton>
            </Link>

            <Link to={"/places"}>
              <SpcialButton>
                <span>مشارعينـــــــا</span>
                <span className="special-font">Our Projects</span>
              </SpcialButton>
            </Link>
          </div>
        </MaxWidthWrapper>
      </motion.div>
    </div>
  );
};
