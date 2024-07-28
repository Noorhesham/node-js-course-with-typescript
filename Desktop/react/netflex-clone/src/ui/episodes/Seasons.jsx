import SeasonCard from "./SeasonCard";

function Seasons({ show, handleClick, click, seasonState }) {
  const seasons = show.episodies;
  return (
    <>
      <div className="grid grid-cols-1  lg:grid-cols-3 h-[40vh] lg:h-[80vh]    overflow-y-scroll text-sm">
        {seasons.map((season, i) => (
          <SeasonCard
            id={season.id}
            onClick={handleClick}
            seasonState={seasonState}
            season={season}
            key={i}
          />
        ))}
      </div>
    </>
  );
}

export default Seasons;
