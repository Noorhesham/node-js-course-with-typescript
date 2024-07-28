import { FaFacebookSquare } from "react-icons/fa"
import FooterList from "./FooterList"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6"

function Footer() {
    return (
        <div className="  relative bottom-0 bg-black text-zinc-400 capitalize items-start  flex flex-col text-2xl py-10 px-20 nd:py-20 md:px-40 ">
            <div  className="flex justify-start self-start gap-3 mb-1 text-3xl text-gray-100">
                <FaFacebookSquare />
                <FaInstagram />
                <FaGithub/>
                <FaLinkedin />
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-1 p-2 text-xs md:text-xl ">
                <a href="https://noor-hesham-portfolio.netlify.app/" className=" p-1 bg-red-700 hover:bg-red-500 duration-150 cursor-pointer my-2 w-fit px-3 text-gray-50 " >my portfolio</a>
                <FooterList>
                <li>contact me : <span className=" lowercase">noordragon2004@gmail.com</span></li>
                </FooterList>
            <div className=" text-sm">
            © 2024 - noor hesham - All Rights Reserved.  
            </div>
            <p></p>
            </div>
        </div>
    )
}

export default Footer
