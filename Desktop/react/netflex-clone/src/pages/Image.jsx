import { useNavigate, useParams } from "react-router";
import ModalImages from "../ui/ModalImages"
import useGetMovie from "../features/movies/useGetMovie";
import Spinner from "../ui/loading/Spinner";

function Image() {
    const {  id,media } = useParams();
    const navigate = useNavigate();
    const { movie, isLoading } = useGetMovie(id,false, media);
    if (isLoading) return <Spinner />;
    return (
        <div>
            <ModalImages setClick={()=>navigate(-1)} slides={movie.images.backdrops} index={0} />
        </div>
    )
}

export default Image
