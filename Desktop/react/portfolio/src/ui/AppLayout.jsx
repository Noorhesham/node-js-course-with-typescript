import Home from "../pages/Home"
import Header from "./Header"
import Skills from "../pages/Skills"
import About from "../pages/About"
import ContactMe from "../ui/ContactMe"
import Contact from "../pages/Contact"
import Project from "../pages/Project"
import { Outlet } from "react-router"

function AppLayout() {
    return (
        <div className=" min-w-full bg-gray-100 dark:dark:bg-slate-900 dark:text-[color:var(--color-grey-800)] relative" >
            <Header />
            <ContactMe/>
            <Home/>
            <Skills />
            <About/>
            <Outlet/>
            <Contact/>
        </div>
    )
}

export default AppLayout
