import { createContext, useContext, useState } from "react";

const QueryContext = createContext();
function SearchProvider({ children }) {
  const [query, setQuery] = useState("");

  return (
    <QueryContext.Provider value={{ query, setQuery,}}>
      {children}
    </QueryContext.Provider>
  );
}
function useSearchQuery() {
  const context = useContext(QueryContext);
  if (context === undefined) throw new Error("used out of range");
  return context;
}
export { useSearchQuery, SearchProvider };
