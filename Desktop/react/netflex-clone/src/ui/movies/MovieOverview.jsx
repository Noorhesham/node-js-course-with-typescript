import { useState } from "react";

function MovieOverview({ overview,small=false,big=false,border=true,full=false }) {
  const [read, setRead] = useState(false);
  const content = overview&&overview?.split(" ");
  function handleReadMore() {
    setRead((r) => !r);
  }
  const length=small?40:full?content.length:80
  return (
    <p className={`${small?"text-xs font-[400] border-b-2 border-gray-400  p-1 pb-5 lg:pb-2 ":big?"lg:flex-grow drop-shadow-md	 text-white font-semibold duration-300  text-xs  lg:text-lg":`text-lg font-normal xl:w-[60%] mt-3 text-gray-100  p-1 pb-5 lg:pb-2${border&&"border-b-2"} `} `}>
      {content?.length > length && !read ? (
        <>
          {content.slice(0, length).join(" ")}
          <span
            onClick={handleReadMore}
            className=" font-semibold ml-3 cursor-pointer text-blue-600"
          >
            read more ...
          </span>
        </>
      ) : (
        <>
          {overview}
          {read && (
            <span
              onClick={handleReadMore}
              className=" font-semibold ml-3 cursor-pointer text-blue-600"
            >
              read less ...
            </span>
          )}
        </>
      )}
    </p>
  );
}

export default MovieOverview;
