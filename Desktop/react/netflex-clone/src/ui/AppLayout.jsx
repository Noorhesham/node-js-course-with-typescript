import { Outlet } from "react-router";
import Header from "./Header";
import { useSearchQuery } from "../context/useSearchQuery";
import SearchResults from "../pages/SearchResults";
function AppLayout() {
  const {query}=useSearchQuery()
  
  return (
    <div className="min-h-0-[100vh] sm:max-w-full ">
      <Header />
      {query&&<SearchResults/>}
      {!query&&<Outlet />}
    </div>
  );
}

export default AppLayout;
