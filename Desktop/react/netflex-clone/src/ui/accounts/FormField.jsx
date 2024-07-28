function    FormField({children}) {
    return (
        <div className=" grid   gap-4 py-5 border-b-2  border-gray-100 last:border-none
        [&:has(button)]:flex [&:has(button)]:justify-end [&:has(button)]:gap-4">
            {children}
        </div>
    )
}

export default FormField
