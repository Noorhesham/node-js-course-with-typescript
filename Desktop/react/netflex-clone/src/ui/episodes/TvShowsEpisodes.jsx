import { MdArrowForwardIos } from "react-icons/md";
import Title from "../components/Title";
import Seasons from "./Seasons";
import Episodes from "./Episodes";
import { useState } from "react";

function TvShowsEpisodes({ show }) {
  //this component takes the show and divide it to seasons component and episodes component
  //on mount all seasons and episodies are loaded
  //there is a common state between episodes and seasons so that it tracks the click on the season
  //if there is a season clicked we store it to state and loop on its episodes instead of looping on all epsiodes
  //there must be a button to set a state to all episodes again

  const [click, setClick] = useState(false);
  const [season, setSeason] = useState();
  const seasons = show.episodies;
  console.log(season);
  function sort() {
    // console.log(seasons.map(s=>s.episodes))
    // we get the data from api unsorted and on mount cannot be added to state so if there is no state we are sorting it
    //if there is state it is easier
    if (!season)
      setSeason(
        seasons
          .map((s) => s.episodes)
          .flat(1)
          .sort((a, b) =>
            a.vote_average < b.vote_average
              ? 1
              : b.vote_average < a.vote_average
              ? -1
              : 0
          )
      ).flat(1);
    else {
      const sorted = {
        ...season,
        episodes: season.episodes.sort((a, b) =>
          a.vote_average < b.vote_average
            ? 1
            : b.vote_average < a.vote_average
            ? -1
            : 0
        ),
      };
      setSeason((s) => (s = sorted));
    }
    // console.log(season.episodes.sort((a,b) => (a.vote_average < b.vote_average) ? 1 : ((b.vote_average < a.vote_average) ? -1 : 0)))
  }
  function handleClick(ses) {
    setClick((s) => !s);
    setSeason(ses);
  }

  return (
    <section className=" grid grid-cols-1 lg:grid-cols-2">

        <div className="flex flex-col">
        <Title>
          All Seasons
          <span className=" text-gray-300 text-sm">{`${show?.number_of_seasons} season`}</span>
          <MdArrowForwardIos className=" white group-hover:text-red-700 duration-100 " />
          <div className="flex gap-2 lg:flex-row flex-col">
          <button
            className=" hover:text-gray-500 duration-100 capitalize border-b-2 border-red-700 text-3xl p-1 text-center place-self-center m-auto self-center"
            onClick={() => setSeason(show.episodies.episodes)}
          >
            reset
          </button>
          <button
            className=" hover:text-gray-500 duration-100 capitalize border-b-2 border-red-700 text-3xl p-1 text-center place-self-center m-auto self-center"
            onClick={() => sort()}
          >
            Sort
          </button>
          </div>
        </Title>

        <Seasons
          click={click}
          handleClick={handleClick}
          seasonState={season}
          show={show}
        />
      </div>
      <div className=" flex flex-wrap lg:flex-nowrap gap-2 items-start ">
        <div>
          <Title>
            {season ? `${season.name || "All episodes"}` : "All episodes"}
            <span className=" text-gray-300 text-sm">
              {season
                ? `${season.episodes?.length || season.length} episodes`
                : `${show?.number_of_episodes} episodes`}
            </span>
            <MdArrowForwardIos className=" white group-hover:text-red-700 duration-100 " />
          </Title>
          <Episodes show={show} season={season} show={show} />
        </div>
      </div>
    </section>
  );
}

export default TvShowsEpisodes;
