import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGE_URL } from "../../utils/Constans";
import { useNavigate } from "react-router";

function Actor({ actor }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/person/${actor.id}`)}
      className="justify-start hover:bg-zinc-900  duration-150  flex shadow-md shadow-red-500/40 bg-black/80 items-center gap-1 text-xs  flex-col   lg:flex-row lg:text-xl "
    >
      <div className=" border-r-[3px] border-red-600 hover:opacity-90 duration-100 cursor-pointer rounded-sm max-w-[6rem]">
        <LazyLoadImage
          effect="blur"
          className="  object-fit"
          src={`${
            actor.profile_path
              ? `${IMAGE_URL}${actor.profile_path}`
              : `/avatar4.jpg`
          }`}
          alt=""
        />
      </div>
      <div className="py-1 ml-3 px-3 text-center lg:text-left flex flex-col">
        <span className=" text-white font-semibold hover:text-red-700 cursor-pointer duration-100 ">
          {actor.original_name}
        </span>
        <span className=" text-gray-400 font-thin">{actor.character}</span>
      </div>
    </div>
  );
}

export default Actor;
