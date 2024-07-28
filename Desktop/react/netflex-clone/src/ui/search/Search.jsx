import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useCloseModal } from "../../hooks/useCloseModal";
import { RxCross2 } from "react-icons/rx";
import { useSearchQuery } from "../../context/useSearchQuery";
import debounce from "lodash/debounce"; // Import debounce

function Search() {
  const [search, setSearch] = useState(false);
  const { query, setQuery } = useSearchQuery();
  const [inputValue, setInputValue] = useState(query); // Local state to handle debounced input

  function open(e) {
    e.stopPropagation();
    setSearch((s) => !s);
  }

  const close = () => {
    if (!query) setSearch(false);
  };

  // الفانكشن دي بنستخدمها علشان نعمل ابديت للستيت الي بيسمع في الكويري 
  const debouncedSetQuery = debounce((value) => {
    setQuery(value);
  }, 500); // 500ms debounce delay

  // Effect to update the query with debounced value
  useEffect(() => {
    debouncedSetQuery(inputValue);
    // Cancel debounce on component unmount
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [inputValue]);

  const ref = useCloseModal(close, false, false);

  return (
    <div
      ref={ref}
      className={`flex relative items-center ${
        search && "outline outline-1"
      }`}
    >
      <motion.button
        onClick={(e) => open(e)}
        className={`transition-all p-1 duration-100 outline-none w-fit justify-end`}
      >
        <IoIosSearch />
      </motion.button>
      <AnimatePresence>
        {search && (
          <>
            <motion.input
              autoFocus
              placeholder="Search Movies, Shows"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              initial={{ width: 0 }}
              key="searchExit"
              animate={{ width: "15rem" }}
              transition={{ duration: 0.4 }}
              exit={{ width: 0 }}
              className={`placeholder:text-gray-400 bg-transparent ml-1 outline-none text-sm h-[2rem]`}
              type="search"
            />
            <motion.button
              initial={{ display: "block" }}
              exit={{ display: "none" }}
              transition={{ duration: 0.3 }}
              className="p-1"
              onClick={() => {
                setQuery("");
                setInputValue("");
                close();
              }}
            >
              <RxCross2 />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Search;
