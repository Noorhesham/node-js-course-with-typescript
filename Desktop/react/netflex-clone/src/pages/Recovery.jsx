import {motion} from "framer-motion"
import { useForm } from "react-hook-form";
import { validateEmail } from "../utils/helpers";
import toast from "react-hot-toast";
import { useRecover } from "../features/authentication/useRecover";

function Recovery() {
    const {register,handleSubmit,reset,formState,}=useForm();
    const {errors}=formState
    const {recoverPassword,isSuccess,isPending}=useRecover()
    function onSubmit(data){
          if(validateEmail(data.email)) recoverPassword(data.email)
          else toast.error("invalid email")
      }
      const inputStyle='bg-zinc-800  border-gray-400 border-2 py-2 px-6 rounded-md outline-none';
    return (
        <motion.form  initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{duration:1}}
        onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 text-xl items-center justify-center  bg-black bg-opacity-60 w-[30rem]
        py-10 px-14 pb-20 ">
         <h1 className=" capitalize text-gray-100 self-start text-4xl mb-2 font-semibold">Reset Password</h1>
         <div>
       <input type="email" id="email" placeholder="Email Address"
       className={`${errors.email?` ${ inputStyle} border-b-2  border-b-orange-400`:inputStyle}`}
       {...register("email",{required:"This field must be filled 😥"})} />
        {errors.email && (
       <p className=" mt-3 text-[1rem] text-orange-400">
         {errors.email.message}
       </p>)}
       </div>
       <button disabled={isPending||isSuccess} className={`py-3 px-5 bg-red-600 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition-all duration-100
         mt-2 self-stretch ${isSuccess&&"bg-green-300 hover:bg-green-500 duration-150"}`} >{isPending?"sending...":"Recover"}{isSuccess&&"Email was sent to reset your password"}</button>
       </motion.form >
     
    )
}

export default Recovery
