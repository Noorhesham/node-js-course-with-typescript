import { SearchIcon } from "./Icons";
import { usePathname } from "next/navigation";

const SearchBox = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-grow items-center gap-10 bg-white/10 rounded-3xl py-2 px-4">
      <input
        className=" w-full bg-transparent placeholder:font-[300] placeholder:my-auto outline-none placeholder:text-xs text-xs  font-medium "
        type="text"
        placeholder="Hey, what are you looking for ?"
      />
      <SearchIcon color={pathname === "/" ? "white" : "black"} />
    </div>
  );
};

export default SearchBox;
