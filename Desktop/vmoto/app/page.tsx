import Image from "next/image";
import { HeroSlider } from "./components/MainSlider";
import { ModelRange } from "./components/ModalCustom";
import { BrandAmbassadors } from "./components/Brand";
import { SkewedButton } from "./components/ButtonCustom";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import { NewsSlider } from "./components/news-swiper";

export default function Home() {
  return (
    <main className="">
      <HeroSlider />
      <ModelRange />
      <BrandAmbassadors />
      <MaxWidthWrapper className="flex lg:mt-0 mt-10 flex-col gap-4 items-center">
        <h2 className=" text-3xl lg:text-5xl font-bold text-black">GLOBAL LEADER IN ELECTRIC MOBILITY SOLUTIONS</h2>
        <img src="/ss1.webp" className=" h-96 lg:w-full  lg:h-[100vh] w-full object-cover" alt="" />
        <p>
          As a leader in electric scooter manufacturing, we provide daily green mobility solutions for urban commuters
          and commercial operations worldwide. Plus, we always have promotions to make your switch to electric even
          easier.
        </p>
        <SkewedButton>Book A Test Ride</SkewedButton>
      </MaxWidthWrapper>
      <section className=" bg-black">
        <MaxWidthWrapper className="flex relative lg:flex-row flex-col items-center">
          <MaxWidthWrapper className="flex text-white flex-col gap-6">
            <h3 className=" text-3xl lg:text-5xl font-bold">VMOTO APP</h3>
            <p>For those who seek a connection with the world around them</p>
            <div className="flex items-center gap-4">
              <SkewedButton className="!flex items-center gap-2">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_635_2501)">
                    <path
                      d="M19.0454 12.763C19.0694 10.893 20.0494 9.16603 21.6424 8.18703C20.6334 6.74503 19.0024 5.86403 17.2434 5.80903C15.3924 5.61503 13.5984 6.91603 12.6554 6.91603C11.6944 6.91603 10.2424 5.82803 8.67838 5.86003C6.62138 5.92703 4.74938 7.06803 3.74838 8.86703C1.61738 12.557 3.20638 17.981 5.24838 20.964C6.27038 22.425 7.46338 24.056 9.02638 23.999C10.5554 23.936 11.1264 23.024 12.9714 23.024C14.7994 23.024 15.3354 23.999 16.9294 23.962C18.5694 23.935 19.6034 22.495 20.5894 21.02C21.3234 19.979 21.8884 18.829 22.2624 17.612C20.3144 16.788 19.0474 14.879 19.0454 12.763Z"
                      fill="black"
                    ></path>
                    <path
                      d="M16.0338 3.847C16.9278 2.773 17.3688 1.393 17.2618 0C15.8958 0.144 14.6328 0.797 13.7268 1.829C12.8318 2.848 12.3778 4.18 12.4658 5.534C13.8508 5.548 15.1658 4.926 16.0338 3.847Z"
                      fill="black"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_635_2501">
                      <rect width="24" height="24" fill="white" transform="translate(0.5)"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <p>
                  Download The App <br />
                  Apple Store
                </p>
              </SkewedButton>
              <SkewedButton className="!flex  !bg-white items-center gap-2">
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.48118 0.198862C1.88279 0.14672 2.29003 0.235804 2.63318 0.450862L14.3332 7.10186L11.3722 10.0989L1.48118 0.198862ZM0.581185 1.09886C0.52476 1.2948 0.497468 1.49798 0.500184 1.70186V20.2959C0.497468 20.4997 0.52476 20.7029 0.581185 20.8989L10.4812 10.9989L0.581185 1.09886ZM11.3812 11.8989L1.48118 21.7989C1.88298 21.8557 2.29183 21.7663 2.63318 21.5469L14.3332 14.8959L11.3812 11.8989ZM19.0492 9.79286L15.5032 7.77686L12.2632 10.9989L15.4942 14.2299L19.0402 12.2139C20.2102 11.5479 20.2102 10.4499 19.0402 9.78386L19.0492 9.79286Z"
                    fill="black"
                  ></path>
                </svg>
                <p>
                  Download The App
                  <br />
                  Play Store
                </p>
              </SkewedButton>
            </div>
          </MaxWidthWrapper>
          <div className=" w-full h-[50vh] lg:h-[75vh] relative">
            <Image
              src={"/Frame-1121_2024-12-11-163328_ysfv.webp"}
              className=" object-contain object-right"
              fill
              alt="photo"
            />
          </div>
        </MaxWidthWrapper>
      </section>
      <NewsSlider />
    </main>
  );
}
