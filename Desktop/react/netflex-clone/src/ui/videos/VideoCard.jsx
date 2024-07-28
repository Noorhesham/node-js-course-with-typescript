import ReactPlayer from "react-player";
import { YOUTUBE_URL } from "../../utils/Constans";
import { useNavigate, useParams } from "react-router";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function VideoCard({
  home,
  video,
  movieId,
  auto = false,
  name = true,
  mute = false,
  mediabool = "movie",
}) {
  const navigate = useNavigate();
  const { media, id } = useParams();
  //i used the same component 2 times first time in the movie when the movieId is the actual id
  //second time in the player when i need to get the id from url
  // console.log(id,movieId)
  return (
    <div className=" flex flex-full flex-col h-full pb-8 rounded-lg relative overflow-hidden">
      <LazyLoadComponent>
        <ReactPlayer
          loading="lazy"
          width="100%"
          height={"100%"}
          onPlay={() =>
            navigate(
              `/player/${media || mediabool}/${video.key}/${
                (home && home) || id || movieId
              }`
            )
          }
          playing={auto}
          controls={true}
          muted={mute}
          className=" rounded-lg h-full object-cover "
          config={{
            youtube: {
              playerVars: { start: 0, rel: 0, showinfo: 0 },
              preload: true,
            },
          }}
          url={`${YOUTUBE_URL}${video?.key}`}
        />
      </LazyLoadComponent>
      {name && (
        <span className="absolute bottom-0 text-sm font-semibold">
          {video.name}
        </span>
      )}
    </div>
  );
}

export default VideoCard;
