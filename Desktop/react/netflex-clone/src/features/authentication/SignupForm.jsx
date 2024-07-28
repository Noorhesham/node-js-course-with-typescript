import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";
import { Link } from "react-router-dom";
import {motion} from "framer-motion"

function SignupForm() {
    const {register,handleSubmit,reset,formState,getValues}=useForm();
    const {errors}=formState;
    const {isPending,signUp}=useSignUp()
    function onSubmit(data){
      signUp(data,{onSettled:()=>reset()})
    }
    function onError(){
    
    }
    const inputStyle='bg-zinc-800 self-stretch border-gray-400 border-2 py-2 px-6 rounded-md outline-none';

    return (
        <motion.div  initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1}}
        className="flex h-full bg-black bg-opacity-60 rounded-md shadow-xl overflow-hidden md:flex-row flex-col ">
            <div className=" rounded-md  bg-[url('/signupbg.png')] bg-cover bg-[33rem] max-w-full md:w-[23rem]">

            </div>
            <form 
         onSubmit={handleSubmit(onSubmit,onError)} className="flex  flex-col gap-10 text-lg  
          justify-center  bg-black bg-opacity-60 md:w-[30rem] w-fit
         py-10 px-14 ">

          <h1 className=" capitalize text-gray-100 self-start text-4xl mb-2 font-semibold">sign up</h1>

          <div className="flex flex-col items-center relative">
        <input type="text" id="full_name" placeholder="Enter your name"
        className={`${errors.full_name?` ${ inputStyle} border-b-2  border-b-orange-400 `:inputStyle}`}
        {...register('full_name',{required:'this field is required 😢'})} />
         {errors.email && (
        <p className=" absolute bottom-[-1.7rem] left-0 text-[.9rem] text-orange-400 ] ">
          {errors.email.message}
        </p>
      )}
          </div>

          <div className="flex flex-col items-center relative">
        <input type="email" id="email" placeholder="Email Address"
        className={`${errors.email?` ${ inputStyle} border-b-2  border-b-orange-400`:inputStyle}`}
        {...register('email',{required:'this field is required 😢',
        pattern:{value:/\S+@\S+\.\S+/,message:'provide a valid email address',
        }})} />
         {errors.email && (
        <p className=" absolute bottom-[-1.7rem] left-0 text-[.9rem] text-orange-400 ] ">
          {errors.email.message}
        </p>
      )}
          </div>
       <div className=" items-center flex flex-col relative" >
       <input type="password" id="password" placeholder="password" 
       className={`${errors.password?` ${ inputStyle} border-b-2 border-b-orange-400`:inputStyle}`}
        {...register("password",{required:"This field must be filled 😥",maxLength:{value:60,message:' Your password must contain between 6 and 60 characters.'}
        ,minLength:{value:6,message:'Your password must contain between 6 and 60 characters.'},})}/>
        {errors.password && (
            <p className=" absolute bottom-[-1.7rem] left-0 text-[.9rem] text-orange-400 ] ">
          {errors.password.message}
        </p>
      )}
       </div>
      <div className=" items-center flex flex-col relative">
      <input type="password" id="passwordConfirm" placeholder="Confirm password" 
      className={`${errors.password?` ${ inputStyle} border-b-2  border-b-orange-400`:inputStyle}`}
      {...register('passwordConfirm',{required:'this field is required 😢',
      validate:(value)=>value===getValues().password||'passwords need to match 😥'})}/>
       {errors.passwordConfirm && (
            <p className=" absolute bottom-[-1.7rem] left-0 text-[.9rem] text-orange-400 ]">
                {errors.passwordConfirm.message}
        </p>
      )}
      </div>
         <button disabled={isPending} className=" py-3 px-5 bg-red-600 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition-all duration-100
         mt-2 self-stretch" >{isPending?"Creating account":"Sign up"}</button>
         <div>
          <span className=" text-gray-400 text-lg mx-auto">Already have an account ? <Link to="/start/login" className=" text-white
           hover:underline transition-all duration-75">Log in instead</Link>.</span>
         </div>
         </form>
        </motion.div>
    )
}

export default SignupForm
