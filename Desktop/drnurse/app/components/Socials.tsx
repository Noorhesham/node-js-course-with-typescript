import { useTranslations } from "next-intl";
import { FaFacebook, FaGoogle, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Socials = () => {
  const t = useTranslations();
  return (
    <div className=" flex flex-col ">
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <span className="w-full" />
        </div>
        {/* <div className="relative flex justify-center text-xs uppercase">
          <p className=" text-xs  text-main bg-gray-50 font-[400] mx-auto text-center">{t("orSign")}</p>
        </div> */}
      </div>
      <div className="flex text-gray-50 self-center  items-center gap-2">
        <span className="  p-1.5 rounded-full  text-lg bg-main">
          <FaFacebook />
        </span>
        <span className="  p-1.5 rounded-full  text-lg bg-main">
          <FaLinkedin />
        </span>
        <span className="  p-1.5 rounded-full  text-lg bg-main">
          <FaWhatsapp />
        </span>
        <span className="  p-1.5 rounded-full  text-lg bg-main">
          <FaXTwitter />
        </span>
        <span className="  p-1.5 rounded-full  text-lg bg-main">
          <FaInstagram />
        </span>
        <span className="  p-1.5 rounded-full  text-lg bg-main">
          <FaYoutube />
        </span>
      </div>
    </div>
  );
};

export default Socials;
