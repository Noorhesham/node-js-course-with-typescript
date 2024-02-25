import {useState} from 'react'

function ContactItem({handleHover,icon,text,link}) {
    const[hover,setHover]=useState(false)
    function handleHover(){
      setHover(h=>!h);
    }
  return (
    <li
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className=" hover:bg-gray-200 transition-all duration-100 p-1 rounded-full relative"
    >
      <a target="_blank" href={link}>
        {icon}
      </a>
      {hover && (
        <p className=" absolute bg-pink-500 text-white text-lg p-2 rounded-md w-[7rem] left-[100%] top-[0] capitalize">
          Check out my {text}
        </p>
      )}
    </li>
  );
}

export default ContactItem;
