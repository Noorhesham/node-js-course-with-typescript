import { useState, useContext, createContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const TabsContext = createContext();

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  const [page,setPage]=useState(1)

  function TabClick(id) {
    setPage(1)
    setActiveTab(id);
  }
  function handlePagination(i){
    setPage(i)
  }
  
  return (
    <TabsContext.Provider value={{ activeTab, TabClick,page,handlePagination }}>
      {children}
    </TabsContext.Provider>
  );
}
export function useTabs(){
    const context=useContext(TabsContext);
    return context
}


export default Tabs;
