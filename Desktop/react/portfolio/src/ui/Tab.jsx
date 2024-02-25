function Tab({ children }) {
    return (
      <ul className=" py-2 px-3  flex m-auto bg-gray-300 text-lg lg:text-3xl  dark:bg-slate-700 w-fit lg:py-2 lg:px-12 cursor-pointer items-center justify-center rounded-full gap-10 text-gray-800 dark:text-gray-100">
        {children}
      </ul>
    );
  }
  
  export default Tab