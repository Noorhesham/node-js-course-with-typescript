import { useNavigate } from "react-router";
import LoginForm from "../features/authentication/LoginForm"
import { useUser } from "../features/authentication/useUser"
function Login() {
    const{isAuthenticated}=useUser();
    const navigate=useNavigate();
    if(isAuthenticated) navigate('/main')
    else return <LoginForm/>
}

export default Login
