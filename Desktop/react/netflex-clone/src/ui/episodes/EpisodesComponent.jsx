import EpisodeCard from "./EpisodeCard";

function EpisodesComponent({ seasonAll, season }) {
  return (
    <div className="rounded-md flex gap-2 md:gap-0 flex-col flex-wrap ">
      {seasonAll?.episodes?.map((episode, i) => (
        <EpisodeCard key={i} episode={episode} />
      )) ||
        seasonAll?.map((episode, i) => (
          <EpisodeCard key={i} episode={episode} />
        ))}
    </div>
  );
}

export default EpisodesComponent;
