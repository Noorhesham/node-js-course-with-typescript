import { IMAGE_URL } from "../../utils/Constans"

function   ActorAvatar({image}) {
    console.log(image)
    return (
        <div className="text-center  w-40 h-40 relative flex justify-start  mr-3">
        <img 
        alt="name" 
        src={`${IMAGE_URL}${image?.file_path||image.profile_path}`}
        className="  rounded-full object-[50%_-10px]  object-cover" />
        </div> 
    )
}

export default ActorAvatar
{/* <div className="text-center  w-40 h-40 relative flex justify-start  mr-3">
<img 
alt="name" 
src={`${IMAGE_URL}${image.file_path}`}
className="  rounded-full object-[50%_-10px]  object-cover" />
</div> */}