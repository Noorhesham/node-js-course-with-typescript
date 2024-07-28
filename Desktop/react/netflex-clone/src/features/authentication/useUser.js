import {  useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useUser(){
    const{isLoading,data:user,error}=useQuery({queryFn:getUser,queryKey:['user']});
    return {isLoading,user,error,isAuthenticated:user?.role==='authenticated'}
}