import React from "react";
import GridContainer from "./defaults/GridContainer";
import { BoxIcon, LocateIcon, PhoneIcon } from "lucide-react";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";

const Footer = () => {
  return (
    <MaxWidthWrapper>
      <GridContainer cols={4}>
        <div className=" border-l border-input pl-2 flex flex-col  gap-6">
          <h1 className=" font-semibold text-black text-lg mb-2 border-b border-input pb-2">Dubai</h1>
          <div className=" flex items-start gap-2">
            <LocateIcon />
            <p>1st Floor, Building 13, Bay Square, Business Bay</p>
          </div>
          <div className=" flex items-start gap-2">
            <BoxIcon />
            <p>PO Box 5883, Dubai, UAE</p>
          </div>
          <div className=" flex items-start gap-2">
            <PhoneIcon />
            <p>+971 4 556 7171 | 800 7100</p>
          </div>
          <div className=" flex items-start gap-2">
            <PhoneIcon />
            <p>Email Icon</p>
          </div>
          <h2>
            UAE Tax Registration Number
            <p>100239834300003</p>
          </h2>
        </div>

        <div className=" border-l border-input pl-2 flex flex-col  gap-6">
          <h1 className=" font-semibold text-black text-lg mb-2 border-b border-input pb-2">Abu Dhabi</h1>
          <div className=" flex items-start gap-2">
            <LocateIcon />
            <p>Offices 901 & 902, Sultan International Tower, Corniche Road</p>
          </div>
          <div className=" flex items-start gap-2">
            <BoxIcon />
            <p>PO Box 62182, Abu Dhabi, UAE</p>
          </div>
          <div className=" flex items-start gap-2">
            <PhoneIcon />
            <p>+971 2 491 0700 | 800 7100</p>
          </div>
          <div className=" flex items-start gap-2">
            <PhoneIcon />
            <p>Email Icon</p>
          </div>
          <h2>
            UAE Tax Registration Number
            <p>100239834300003</p>
          </h2>
        </div>
        <div className=" border-l border-input pl-2 flex flex-col  gap-6">
          <h1 className=" font-semibold text-black text-lg mb-2 border-b border-input pb-2">Riyadh</h1>
          <div className=" flex items-start gap-2">
            <LocateIcon />
            <p>Al Awad Building, RUQA 7523 (DMS), Said bin Zaid Street, Qurtubah</p>
          </div>
          <div className=" flex items-start gap-2">
            <BoxIcon />
            <p>PO Box 220460, Riyadh 11311, KSA</p>
          </div>
          <div className=" flex items-start gap-2">
            <PhoneIcon />
            <p>+966 11 451 7017 | 9200 13917</p>
          </div>

          <h2>
            KSA Tax Registration Number
            <p>311655469100003</p>
          </h2>
        </div>

        <div className=" border-l border-input pl-2 flex flex-col  gap-6">
          <h1 className=" font-semibold text-black text-lg mb-2 border-b border-input pb-2">Jeddah</h1>
          <div className=" flex items-start gap-2">
            <LocateIcon />
            <p>Office 206, Sultana Square, Prince Sultan Road</p>
          </div>
          <div className=" flex items-start gap-2">
            <BoxIcon />
            <p>PO Box 1394, Jeddah 21414, KSA</p>
          </div>
          <div className=" flex items-start gap-2">
            <PhoneIcon />
            <p>9200 13917</p>
          </div>

          <h2>
            KSA Tax Registration Number
            <p>311655469100003</p>
          </h2>
        </div>
      </GridContainer>
    </MaxWidthWrapper>
  );
};

export default Footer;
