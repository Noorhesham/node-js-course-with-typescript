import {  Outlet } from "react-router-dom";
function Start() {

    return (
        <div className=" bg-[url('/bg1.jpg')] bg-center bg-no-repeat bg-cover  h-[100vh]  text-gray-50 ">
        <div className="  h-full flex flex-col gap-5  justify-center items-center backdrop-brightness-50 ">
         <Outlet/>
        </div>
        </div>
    )
}

export default Start
