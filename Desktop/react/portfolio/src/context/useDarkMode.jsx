import { createContext,useContext,useEffect } from "react";
import {useLocalStorage} from "../hooks/useLocalStorage"
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";

const DarkModeContext=createContext()
function DarkModeProvider({children}){
    const [isDark,setIsDark]=useLocalStorage(window.matchMedia('(prefers-color-scheme: dark)').matches,'isDarkMode');
    const icon=isDark?<IoMoonOutline/>:<CiSun/>
    function toggleDarkMode(){
        setIsDark(dark=>!dark);
    }
    useEffect(function(){
       if(isDark){
        document.documentElement.classList.add('dark');
        document.querySelector("#switcher").classList.add('bg-slate-800',"translate-x-full");
        document.querySelector("#switcher").classList.remove('bg-orange-400',"-translate-x-2");
     }
       else {
        document.documentElement.classList.remove('dark');
        document.querySelector("#switcher").classList.add('bg-orange-400',"-translate-x-2");
        document.querySelector("#switcher").classList.remove('bg-slate-800',"translate-x-full")
    }
    },[isDark])
    return <DarkModeContext.Provider value={{isDark,toggleDarkMode}}>
    {children}
    </DarkModeContext.Provider> 
}
function useDark(){
    const context=useContext(DarkModeContext)
    if(context===undefined) throw new Error('context was used out of scope')
    return context;
}
export {useDark,DarkModeProvider}