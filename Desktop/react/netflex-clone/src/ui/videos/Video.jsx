import ReactPlayer from "react-player";
import { YOUTUBE_URL } from "../../utils/Constans";

function Video({ rand, handlePause, trailers, mute, small = false, height }) {
  // <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
  //     <YouTube opts={{height:'90%',width:'100%',playerVars:{autoplay:1,controls:0,rel:0,fs:0,disablekb:0,}}}
  //    className="relative   w-full h-full rounded-2xl bg-center bg-cover duration-500" videoId={activeMovie.videos.results[0].key}/>
  return !small ? (
    <div className=" relative  pt-[2.5rem]  xl:w-[300%] h-full xl:left-[-100%]">
      <ReactPlayer
        onPause={handlePause}
        width="100%"
        height="100%"
        playing={true}
        controls={false}
        loop={true}
        className=" absolute top-0 left-0 w-full h-full rounded-2xl bg-center bg-cover"
        config={{ youtube: { playerVars: { start: 1 } } }}
        url={`${YOUTUBE_URL}${trailers[rand]?.key}`}
      />
    </div>
  ) : (
    <ReactPlayer
      width="100%"
      height={"100%"}
      playing={true}
      controls={false}
      className="pointer-events-none rounded-lg h-full object-cover  "
      config={{
        youtube: {
          playerVars: { start: 11, rel: 0, showinfo: 0 },
          preload: true,
        },
      }}
      muted={mute}
      url={`${YOUTUBE_URL}${trailers[rand]?.key}`}
    />
  );
}

export default Video;
