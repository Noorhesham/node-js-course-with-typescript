import { useNavigate } from "react-router";
import SignupForm from "../features/authentication/SignupForm"
import { useUser } from "../features/authentication/useUser";

function SignUp() {
    const{isAuthenticated}=useUser();
    const navigate=useNavigate();
    if(isAuthenticated) navigate('/main')
    return (
        <div>
            <SignupForm/>
        </div>
    )
}

export default SignUp
