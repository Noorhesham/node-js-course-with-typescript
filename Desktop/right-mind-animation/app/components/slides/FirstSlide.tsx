import React from "react";
import Paragraph from "../Paragraph";

const FirstSlide = ({
  videRef,
  animateParagraph,
}: {
  videRef: React.RefObject<HTMLVideoElement>;
  animateParagraph: boolean;
}) => {
  return (
    <section className=" absolute inset-0 w-full h-full ">
      <div className=" z-40">
        <Paragraph
          height="h-20"
          animate={animateParagraph}
          playAfterTL
          className="paragraph capitalize  bottom-auto top-64 md:bottom-80  md:top-auto lg:bottom-64 absolute left-10 lg:left-40 
          !text-7xl  z-40"
          text="Life  style"
        />
        <Paragraph
          height={"h-8"}
          animate={animateParagraph}
          className="paragraph  lowercase top-[40%] max-w-xl lg:top-auto  lg:bottom-20 absolute right-10 lg:left-96 !text-xl   z-40"
          text="Right Mind is a leading company in the real estate development sector, providing innovative and effective solutions to meet the demands of the modern real estate market. We focus on quality, modern designs, and sustainability, striving to balance luxury with functionality across all our projects."
        />
      </div>
      <div className="absolute inset-0 w-full h-full">
        <video ref={videRef} loop src="/video-main.mp4" muted className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </section>
  );
};

export default FirstSlide;
