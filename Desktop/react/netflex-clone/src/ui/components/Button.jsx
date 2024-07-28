function Button({children,onClick}) {
    return (
           <button onClick={onClick}
              className="bg-red-600 text-gray-100 text-center mx-auto w-fit
       shadow-xl button  rounded-sm mt-10 text-xl py-2 px-4 active:shadow-sm hover:translate-y-[-.5rem] hover:opacity-80 transition-all duration-100"
            >
              <span className="">
                {children}
              </span>
            </button>  
    )
}

export default Button
