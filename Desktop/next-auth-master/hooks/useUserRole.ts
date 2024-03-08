import { useSession } from "next-auth/react"

export const useUserRole=()=>{
    const session=useSession()
    return session.data?.user.role
}