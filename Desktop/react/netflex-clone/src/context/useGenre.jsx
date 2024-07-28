import { createContext, useContext, useState } from "react";

const genreContext = createContext();
function GenreProvider({ children }) {
  const [genre, setGenre] = useState('');
 
  return (
    <genreContext.Provider value={{ genre ,setGenre}}>
      {children}
    </genreContext.Provider>
  );
}
function useGenre() {
  const context = useContext(genreContext);
  if (context === undefined) throw new Error("used out of range");
  return context;
}
export { useGenre, GenreProvider };
