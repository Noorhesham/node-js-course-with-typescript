import { FaLinkedin ,FaFacebook ,FaInstagram  } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import ContactItem from "./ContactItem";
function ContactMe() {

    const items=[{icon:<FaGithub />,text:'github',link:'https://github.com/Noorhesham'}
    ,{icon:<FaLinkedin className=" text-blue-600"/>,text:'linkedin',link:'https://www.linkedin.com/in/noor-elgendy-0aa84b207/'},
    {icon:<FaFacebook className=" text-blue-700"/>,text:"facebook",link:'https://web.facebook.com/profile.php?id=100006306765558'},
    {icon:<img src="/insta.webp" className=" w-10"/>,text:"instagram",link:'https://www.instagram.com/noorhesham174/'}]
    return (
        <div className=" hidden lg:block z-50 bg-gray-300 dark:bg-slate-800 py-3 px-1 rounded-full fixed top-[20%] left-14 border-pink-400 border-2 shadow-xl">
           <ul className="flex flex-col  text-4xl items-center gap-5 justify-center  ">
            {items.map(item=><ContactItem link={item.link} icon={item.icon} text={item.text} />)}
            </ul> 
        </div>
    )
}

export default ContactMe
