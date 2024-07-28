import { useNavigate } from "react-router";
import MovieTitle from "../movies/MovieTitle";
import MovieOverview from "../movies/MovieOverview";
import Title from "../components/Title";
import MovieCardsSwiper from "../swipers/MovieCardsSwiper";
import { MdArrowForwardIos } from "react-icons/md";
import ActorMainAvatar from "./ActorMainAvatar";
import { chunk } from "../../utils/helpers";

function PersonData({ person }) {
  const navigate = useNavigate();
  const media = "person";
  function navigateToImages() {
    navigate(`/image/${media}/${person.id}`);
  }
  //   const backdrops =person?.images.profiles;
    const movies=person?.movie_credits?.cast||person.known_for
    const arr=chunk(movies,30)
    const tv=person?.tv_credits?.cast||[]
  return (
    <>
      <div className=" absolute top-[18%] left-[10%] text-5xl font-semibold w-[80%]   ">
      <MovieTitle movie={person}/>
        <div className=" border-b-2 border-gray-400 flex flex-col lg:flex-row  justify-stretch  lg:flex-nowrap  gap-2 items-stetch  ">

        <ActorMainAvatar image={person.profile_path}/>

        <MovieOverview full={true} overview={person.biography} />
      </div>
     { person.images?.profiles?.length&&<div className=" col-span-2">
            <Title onClick={navigateToImages}>
              Profiles
              <span className=" text-gray-300 text-sm">
                {person.images.profiles.length}
              </span>
              <MdArrowForwardIos className=" white group-hover:text-red-700 duration-100 " />
            </Title>
            <MovieCardsSwiper
              avatar={true}
              movies={person.images?.profiles}
            />
          </div>}
        <div>
        <Title onClick={navigateToImages}>
              Played Movies
              <span className=" text-gray-300 text-sm">
                {movies.length}
              </span>
              <MdArrowForwardIos className=" white group-hover:text-red-700 duration-100 " />
            </Title>
            {arr.map((a,i)=><MovieCardsSwiper media="movie" poster={true} key={i} movies={a}/>)}
        </div>
        <div>
        <Title onClick={navigateToImages}>
              Played Shows
              <span className=" text-gray-300 text-sm">
                {movies.length}
              </span>
              <MdArrowForwardIos className=" white group-hover:text-red-700 duration-100 " />
            </Title>
            <MovieCardsSwiper
            media="tv"
              poster={true}
              movies={tv}
            />
        </div>
      </div>
    </>
  );
}

export default PersonData;
