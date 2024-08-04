"use client";
import { useEffect, useState } from "react";

const images = ["/img1.png", "/img2.png", "/img3.png"];
const SLIDERTIMER = 3000;
const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, SLIDERTIMER);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="">
      {images.map((src, index) => (
        <div
          onClick={() => setCurrentImage((i) => (i != images.length - 1 ? i + 1 : 0))}
          style={{
            backgroundImage: `url('${images[currentImage]}')`,
            backgroundPosition: "center",
            // backgroundAttachment: "fixed",
            zIndex: 1,
          }}
          key={index}
          className={`reveal_animation bg-no-repeat bg-cover absolute inset-0 `}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
