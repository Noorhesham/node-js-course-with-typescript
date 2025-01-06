import Image from "next/image";
import Loader from "./components/Loader";
import FirstScene from "./components/FirstScene";
import SecondScenePhone from "./components/SecondScenePhone";

export default function Home() {
  return (
    <div className=" relative ">
      <Loader />
      <FirstScene />
      <div className=" opacity-0  hidden rest">
        <SecondScenePhone />
      </div>
    </div>
  );
}
