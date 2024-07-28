import { useNavigate } from "react-router"
import { useUser } from "../features/authentication/useUser"
import { useEffect } from "react";
import Spinner from "./loading/Spinner";

function ProtectedRoute({children}) {
    const navigate=useNavigate()
    const {isLoading,isAuthenticated}=useUser();
    useEffect(function(){
        if(!isAuthenticated&&!isLoading) navigate('start/login');
    },[isAuthenticated,isLoading,navigate])
    if(isLoading) return<Spinner/>
    if(isAuthenticated) return children
}

export default ProtectedRoute
