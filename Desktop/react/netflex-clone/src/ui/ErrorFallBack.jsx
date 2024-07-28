function ErrorFallback({ message,search=false}) {
  return (
        <div className=" flex flex-col items-center justify-center min-h-[40rem] ">
        <h1 className=" font-semibold text-xl mb-8 ">Something went wrong !😿
        {message}
        </h1>
      {search&&<>
        <h5 className=" mb-2 text-lg">suggessions:</h5>
        <ul className=" text-lg  list-disc">
            <li>try different keyword</li>
            <li>looking for a movie or tv show ?</li>
            <li>try using a movie,tv show title</li>
        </ul>
      </>}
        </div>
        
  )
}

export default ErrorFallback