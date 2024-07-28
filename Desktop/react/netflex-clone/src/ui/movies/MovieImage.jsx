import { useState } from "react";
import { IMAGE_URL_SMALL } from "../../utils/Constans";
import ModalImages from "../ModalImages";
import { createPortal } from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function MovieImage({ image, path, index, slides, width = false }) {
  const [img, setImg] = useState(index);
  const [click, setClick] = useState(false);
  function handleClick() {
    setClick((c) => !c);
    setImg(index);
  }
  return (
    <div
      className={
        width
          ? `w-full `
          : `relative w-full hover:opacity-90 hover:border-2 border-red-700 duration-100  rounded-lg  sm:w-[20rem] sm:mt-4`
      }
    >
      <LazyLoadImage
        effect="blur"
        onClick={() => handleClick(index)}
        className="duration-150 cursor-pointer hover:opacity-90  rounded-lg "
        src={`${IMAGE_URL_SMALL}${image?.file_path||image?.logo_path || path}`}
        alt=""
      />
      {click &&
        createPortal(
          <ModalImages setClick={setClick} slides={slides} index={img} />,
          document.body
        )}
    </div>
  );
}

export default MovieImage;
