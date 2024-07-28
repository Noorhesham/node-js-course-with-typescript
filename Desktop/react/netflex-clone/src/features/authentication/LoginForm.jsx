import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import {motion} from "framer-motion"
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { validateEmail } from "../../utils/helpers";

function LoginForm() {
    const {register,handleSubmit,reset,formState}=useForm();
    const {errors}=formState;
    const {isPending,login}=useLogin()

    function onSubmit(data){
      console.log(validateEmail(data.email))
        if(validateEmail(data.email)) login(data,{onSettled:()=>reset()})
        else toast.error("invalid email")
    }
    function onError(e){
    console.log(e.message)
    }
    const inputStyle='bg-zinc-800  border-gray-400 border-2 py-2 px-6 rounded-md outline-none';
    return (
        <motion.form onError={(e)=>onError(e)}  initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{duration:1}}
         onSubmit={handleSubmit(onSubmit,onError)} className="flex flex-col gap-10 text-xl items-center justify-center  bg-black bg-opacity-60 max-w-full md:w-[30rem]
         py-10 px-14 pb-20 ">
          <h1 className=" capitalize text-gray-100 self-start text-4xl mb-2 font-semibold">sign in</h1>
          <div>
        <input type="email" id="email" placeholder="Email Address"
        className={`${errors.email?` ${ inputStyle} border-b-2  border-b-orange-400`:inputStyle}`}
        {...register("email",{required:"This field must be filled 😥"})} />
         {errors.email && (
        <p className=" mt-3 text-[1rem] text-orange-400">
          {errors.email.message}
        </p>
      )}
          </div>
       <div className=" items-center flex flex-col" >
       <input type="password" id="password" placeholder="password" 
       className={`${errors.password?` ${ inputStyle} border-b-2  border-b-orange-400`:inputStyle}`}
        {...register("password",{required:"This field must be filled 😥",maxLength:60,minLength:4,})}/>
        {errors.password && (
        <p className=" mt-3 text-[1rem] text-orange-400 ] ">
          {errors.password.message}
        </p>
      )}
        {errors.password && errors.password.type === "maxLength"&& (
        <p className=" mt-3 text-[1rem] text-orange-400 ] w-[14rem]  ">
          Your password must contain between 4 and 60 characters.
        </p>
      )}
        {errors.password &&  errors.password.type === "minLength"&& (
        <p className=" mt-3 text-[1rem] text-orange-400 ]  ">
          Your password must contain between 4 and 60 characters.
        </p>
      )}
       </div>
         <button disabled={isPending} className=" py-3 px-5 bg-red-600 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition-all duration-100
         mt-2 self-stretch" >{isPending?"Logging":"Sign in"}</button>
          <div className="flex items-start gap-3 flex-col">
          <span className=" text-gray-400 text-lg">New to Movie-Boi ? <Link to="/start/signup" className=" text-white
           hover:underline transition-all duration-75">Sign up now</Link>.</span>
          <span className=" text-gray-400 text-lg">Forgot password ? <Link to="/start/recover" className=" text-red-700 hover:text-red-600 duration-100
           hover:underline transition-all ">Recovery</Link>.</span>
         </div>
         </motion.form>
    )
}

export default LoginForm
