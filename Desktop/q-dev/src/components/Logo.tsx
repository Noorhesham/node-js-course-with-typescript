import { Link } from "react-router-dom";

const Logo = ({ size, col }: { size?: string; col?: boolean }) => {
  return (
    <Link to={"/"}>
      {<img className={` ${size ? size : "w-44 h-10  grow" }  `} src={col ? "/logocol.svg" : "/logo.svg"} alt="" />}
    </Link>
  );
};

export default Logo;
