import Card from "../Card"

function MovieCards({title,movies}) {
    return (
        <>
        <h1 className=" mt-10 lg:ml-10 text-3xl lg:text-4xl   font-semibold mb-3 border-l-4 border-yellow-400 pl-2 "    >{title}</h1>
        <section  className=" flex items-start flex-col lg:flex-row  justify-center gap-2 lg:items-center ml-0 lg:ml-10 select-none">
          {movies?.map(movie => (<Card mute={true} movie={movie} key={movie.id} />))}
        </section>
        </>
    )
}

export default MovieCards
