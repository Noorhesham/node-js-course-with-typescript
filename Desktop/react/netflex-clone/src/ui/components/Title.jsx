function Title({children,onClick,margin=false}) {
    return (
        <h2 onClick={onClick} className={` capitalize self-start lg:flex-row   cursor-pointer group w-fit flex items-center
         gap-2 mt-10  text-4xl font-semibold mb-4 border-l-4 border-red-600 pl-2 ${margin&&"ml-10"}`}>
          
        {children}
      
      </h2>
    )
}

export default Title
