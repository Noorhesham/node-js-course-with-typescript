import { Link } from "react-router-dom";

const Logo = ({ size, col }: { size?: string; col?: boolean }) => {
  return (
    <Link to={"/"}>
      {<img className={` ${size ? size : "w-44"}  `} src={col ? "/logocol.svg" : "/logo.svg"} alt="" />}
    </Link>
  );
};

export default Logo;
