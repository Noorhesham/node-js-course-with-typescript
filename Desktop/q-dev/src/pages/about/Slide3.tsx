import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { useNav } from "@/context/NavContext";
import { useEffect } from "react";

const Slide3 = () => {
  const { setTitle } = useNav();
  useEffect(() => {
    setTitle("Our CEO");
  }, []);
  return (
    <div className="relative min-h-screen  overflow-hidden">
      {/* Background Wave Pattern */}
      <div className="absolute inset-0 opacity-30">
        <img src="/Rectangle 3 (2).png" alt="Background Pattern" className="object-cover z-10 bg-fixed" />
      </div>
      <MaxWidthWrapper className="text-white z-30 relative container mx-auto">
        <div className="flex items-center justify-between py-32">
          <div className="max-w-xl">
            <ul className="space-y-6 ">
              <li>Eng. Ahmed Thabet holds a bachelor’s degree in Engineering from Alexandria University.</li>
              <li>
                Prior to this, he has worked in several real-estate, commercial and touristic developments. Thabet held
                several administrative positions in a number of well-known real estate & construction companies. Between
                2013 and 2017
              </li>
              <li> In 2017 he founded Jumeirah Egypt for Real Estate Investments and served as CEO till 2023.</li>
              <li>
                In 2023 he founded Q group that includes Q developments, Q assets Management, Invest for real-estate
                investment, Q Art House, Moth real-estate investment and Q hotel management
              </li>
            </ul>
          </div>

          <div className=" relative">
            <div className="relative w-[400px] h-[500px] rounded-lg  overflow-hidden">
              <img
                src="/Rectangle 5 (2).png"
                alt="CEO"
                className="object-cover right-0 absolute top-1/2 -translate-y-1/2  z-20 w-[80%] h-[80%]"
              />{" "}
            </div>
            <img
              src="/Vector (14).png"
              alt="Background Pattern"
              className="object-cover z-10 absolute inset-0 w-full h-full"
            />
            <div className=" -mt-8 pb-4  relative  ">
              <h2 className=" text-2xl font-semibold   relative text-center  special-font text-main2 z-30">
                Eng Ahmed Gaber
              </h2>
              <p className="text-black relative z-30  text-center">is the CEO of Q developments.</p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide3;
