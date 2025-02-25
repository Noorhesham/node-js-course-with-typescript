"use client";

import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import SpcialButton from "./SpcialButton";
import { MaxWidthWrapper } from "./MaxWidthWrapper";

const tabs = [
  { id: "about", label: "About" },
  { id: "location", label: "Location" },
  { id: "facilities", label: "Facilities" },
  { id: "masterplan", label: "Master Plan" },
  { id: "videos", label: "Videos" },
  { id: "images", label: "Images" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Start = () => {
  const { placeId, projectId } = useParams();

  return (
    <div className="min-h-screen bg-[#003B5C]">
      <MaxWidthWrapper className="relative pt-20 z-10 flex items-center flex-col gap-5">
        <motion.img
          layoutId="shared-logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          src="/logocol.svg"
          className="w-72"
          alt="Q Developments"
        />
        <motion.div variants={container} initial="hidden" animate="show" className="flex gap-4 mb-8">
          <div className="gap-5 mt-5 grid grid-cols-4">
            {tabs.map((tab) => (
              <motion.div key={tab.id} variants={item}>
                <Link to={`/${placeId}/${projectId}/${tab.id}`}>
                  <SpcialButton className=" !text-base !font-bold special-font">{tab.label}</SpcialButton>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Start;
