import { useState } from "react";
import { createPortal } from "react-dom";
import EpisodeModal from "./EpisodeModal";
import EpisodeContent from "./EpisodeContent";

function EpisodeCard({ episode }) {
  const [click, setClick] = useState(false);

  function handleOnClick() {
    setClick(true);
    document.body.style.overflow = "hidden";
  }
  function close() {
    setClick(false);
    document.body.style.overflowY = "scroll";
    document.body.style.overflowX = "hidden";
  }
  return (
    <>
      <div
        onClick={() => handleOnClick()}
        className={` group cursor-pointer hover:bg-zinc-900  duration-150
         hover:border-red-700  flex flex-col p-3 
         md:flex-row md:p-1 md:pt-2 shadow-xl
          bg-black/45  gap-2 text-sm border-b-[1px]
           md:border-b-2 border-gray-300 `}
      >
        <EpisodeContent episode={episode} handleOnClick={handleOnClick} />
      </div>
      {click &&
        createPortal(
          <EpisodeModal episode={episode} close={close} />,
          document.body
        )}
    </>
  );
}

export default EpisodeCard;
