"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Slide from "./Slide";
const Slider = () => {
  return (
    <Carousel
      className={` hidden md:block  w-[45%] bg-2 `}
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <Slide
            text="Some text about your shop adjust it as you like."
            image="/img1.png"
          />
        </CarouselItem>
        <CarouselItem>
          <Slide
            text="Some text about your shop adjust it as you like."
            image="/img2.png"
          />
        </CarouselItem>
        <CarouselItem>
          <Slide
            text="Some text about your shop adjust it as you like"
            image="/img3.png"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Slider;
