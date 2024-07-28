import { Link } from "react-router-dom"

function OasisButton({variation,children,onClick,disabled,as,to}) {
  const danger=" text-red-100 bg-red-700 hover:bg-red-800 transition-all duration-0.75"
  const small="text-md py-2 px-3 font-semibold uppercase "
  const mid="text-xl py-3.5 px-4.5"
  const large="text-2xl py-5 px-10 font-semibold"
  const icon='focus:outline-none ml-auto '
  const secondary='focus:ring-2 ring-cyan-500 text-gray-600  bg-gray-200 border-gray-300 hover:bg-gray-100 transition-all duration-200'
  const primary='flex justify-center text-gray-50 bg-red-600 hover:bg-red-700 transition-all duration-3000 '
  const styles={
    danger:large+danger,
    icon:icon+small,
    small:small,
    primary:large+primary,
    secondary : large +secondary,
    secondarysmall:secondary+small,
    primarysmall:primary+small
  }
  return (
    as==="Link"&&to?<Link className={styles[variation]} to={to}>{children}</Link>:<button  disabled={disabled} onClick={onClick} className={styles[variation]} >
      {children}
    </button>
  )
}

export default OasisButton
