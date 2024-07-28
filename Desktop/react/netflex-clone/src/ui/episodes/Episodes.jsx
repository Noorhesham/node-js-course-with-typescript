import EpisodesComponent from "./EpisodesComponent";

function Episodes({ season, show }) {
  const seasons = show.episodies;
  return (
    <div className="  flex flex-col h-[80vh]  overflow-y-scroll ">
      {season ? (
        <EpisodesComponent seasonAll={season} />
      ) : (
        seasons.map((seasonAll, i) => (
          <EpisodesComponent show={show} key={i} seasonAll={seasonAll} />
        ))
      )}
    </div>
  );
}

export default Episodes;
