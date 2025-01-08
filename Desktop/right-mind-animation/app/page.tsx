import Loader from "./components/Loader";
import FirstScene from "./components/FirstScene";
import SecondScenePhone from "./components/SecondScenePhone";
import ThirdSlider from "./components/ThirdSlider";
import Success from "./components/Success";
import XSldier from "./components/XSldier";
import ContactUs from "./components/ContactUs";
import Paragraph from "./components/Paragraph";
import gsap from "gsap";
import IfinteMove from "./components/IfinteMove";

export default function Home() {
  return (
    <div className=" relative ">
      <Loader />
      <FirstScene />
      <div className=" opacity-0  hidden rest">
        <SecondScenePhone />

        <ThirdSlider />
        <Success />
        <XSldier />
        <ContactUs />
        <IfinteMove />
      </div>
      {/* <ContactUs /> */}
      {/* <XSldier /> */}
      {/* <ThirdSlider /> */}
    </div>
  );
}
