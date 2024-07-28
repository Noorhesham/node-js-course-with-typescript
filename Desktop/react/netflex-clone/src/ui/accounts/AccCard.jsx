function AccCard({children,icon,label,data}) {
    return (
        <div className=" flex flex-col border-2 border-gray-400 py-5 px-10 h-fit gap-1 justify-start ">
        <div className=" flex gap-10 [&>svg]:text-red-600 [&>svg]:text-4xl">
        <h2 className=" font-semibold">{label}</h2> {icon}
         </div>
         <h3>{data}</h3>
        </div>
        
    )
}

export default AccCard