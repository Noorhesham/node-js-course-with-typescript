import  { useDark } from "../context/useDarkMode"
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";

function DarkBtn() {
    const {isDark,toggleDarkMode}=useDark()

    return (
        <button onClick={toggleDarkMode} className={`relative w-28 h-14 text-4xl rounded-full bg-gray-100 hover:bg-gray-300 flex items-center transition-all duration-300 focus:outline-none shadow`}>

           <div id="switcher" className={` w-14 h-14 bg-orange-400 text-white rounded-full flex items-center justify-center
           transition-all duration-300`}>
                {isDark? <IoMoonOutline/>:<CiSun/>}</div>
            
        </button>
    )
}

export default DarkBtn
