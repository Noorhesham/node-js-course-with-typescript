function Label({children,icon,onClick}) {
    return (
        <div onClick={onClick} className="flex text-xs rounded-md py-2 px-3 font-semibold items-center capitalize bg-red-600
         hover:text-white self-center m-auto text-gray-200 hover:bg-red-500 duration-100 cursor-pointer mt-5 xl:mt-0">
           {icon}
           {children} 
        </div>
    )
}

export default Label
