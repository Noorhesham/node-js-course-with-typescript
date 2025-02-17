import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import Image from "next/image";

export const VisionSlide = () => {
  return (
    <div className="min-h-screen  relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-20" />

      <MaxWidthWrapper className="grid grid-cols-2 gap-12 min-h-screen py-20">
        <div className="space-y-12">
          <div>
            <h2 className="text-cream text-4xl font-serif mb-4">Our Vision</h2>
            <p className="text-cream/80 leading-relaxed">
              To become the leading innovative force in the Accessible Intermediate Luxury Real Estate category in the
              MENA Region...
            </p>
          </div>

          <div className="relative h-[200px] rounded-lg overflow-hidden">
            <Image src="/vision-image.jpg" alt="Vision" fill className="object-cover" />
          </div>

          <div>
            <h2 className="text-cream text-4xl font-serif mb-4">Our Values</h2>
            <p className="text-cream/80 leading-relaxed">
              Our set of core values represent what is uniquely and consistently true...
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <div className="relative h-[200px] rounded-lg overflow-hidden">
            <Image src="/mission-image.jpg" alt="Mission" fill className="object-cover" />
          </div>

          <div>
            <h2 className="text-cream text-4xl font-serif mb-4">Our Mission</h2>
            <p className="text-cream/80 leading-relaxed">To build real homes where dreams take flight...</p>
          </div>

          <div className="relative h-[200px] rounded-lg overflow-hidden">
            <Image src="/values-image.jpg" alt="Values" fill className="object-cover" />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
