import { useNavigate } from "react-router"
import { IMAGE_URL } from "../../utils/Constans"

function ActorMainAvatar({image,person}) {
    const navigate=useNavigate()
    function onClick(){
        navigate(`/person/${person.id}`)
    }
    return (
        <div onClick={onClick} className="text-center hover:opacity-85 duration-150 cursor-pointer  lg:max-w-[18rem] relative flex justify-start  mr-3">
         <img 
    alt="name" 
    src={`${IMAGE_URL}${image}`}
    className="object-fit object-cover -full custom-position" />
    </div>
    )
}

export default ActorMainAvatar
