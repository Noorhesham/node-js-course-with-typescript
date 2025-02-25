import React from "react";

const Video = ({src}:{src:string}) => {
  return (
    <div>
      <div className=" w-full  h-screen">
        <video
          src="/JoJo with Dragon Ball Sound Effects Test.mp4"
          className="w-full h-full inset-0  object-cover"
        ></video>
      </div>
    </div>
  );
};

export default Video;
