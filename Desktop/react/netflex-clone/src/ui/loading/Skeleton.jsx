import FeedSkeleton from "./FeedSkeleton";

function Skeleton() {
  return (
    <div className="flex flex-wrap justify-center items-center p-5 text-center   gap-5 ">
      {Array(5).fill(<FeedSkeleton />)}
    </div>
  );
}

export default Skeleton;
