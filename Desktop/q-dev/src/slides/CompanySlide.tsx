import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import Image from "next/image";

export const CompanySlide = () => {
  return (
    <div className="min-h-screen bg-blue-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-20" />

      <MaxWidthWrapper className="grid grid-cols-2 gap-12 min-h-screen items-center">
        <div>
          <h2 className="text-cream text-5xl font-serif mb-8">Reach to the Beyond</h2>
          <p className="text-cream/80 mb-12 leading-relaxed">
            Q Developments was established in 2023 to originate life signature in the Egyptian market by delivering key
            development projects owned by the highest standards...
          </p>

          <div className="grid grid-cols-3 gap-8">
            <div className="text-cream">
              <div className="text-4xl font-bold mb-2">22</div>
              <div className="text-sm opacity-80">BILLION INVESTMENT</div>
            </div>
            <div className="text-cream">
              <div className="text-4xl font-bold mb-2">260</div>
              <div className="text-sm opacity-80">ACRES TOTAL LAND</div>
            </div>
            <div className="text-cream">
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-sm opacity-80">BILLION DEVELOPMENTS</div>
            </div>
          </div>
        </div>

        <div className="relative h-[600px]">
          <Image src="/building.jpg" alt="Modern Building" fill className="object-cover rounded-lg" />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
