"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, checked, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 overflow-hidden relative w-12 lg:h-[2rem] lg:w-[4rem] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-gradient-to-r from-[#2a5298] to-[#1e3c72]" : "bg-gradient-to-r from-[#fffcba] to-[#ff7d2d]",
      className
    )}
    {...props}
    ref={ref}
    checked={checked}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block z-10 relative  h-6 w-6 lg:h-[2rem] lg:w-[2rem] rounded-full bg-background shadow-lg ring-0 transition-transform flex justify-center items-center",
        checked
          ? "data-[state=checked]:translate-x-6 lg:data-[state=checked]:translate-x-[2.1rem]"
          : "data-[state=unchecked]:translate-x-0"
      )}
    >
      {checked ? (
        <Image height={100} width={100} src="/moon.png" alt="" />
      ) : (
        <Image height={100} width={100} src="/sun2.png" alt="" />
      )}
    </SwitchPrimitives.Thumb>
    <div className={cn("absolute top-0 left-0 h-full w-full flex", checked ? "moveStars" : "moveClouds")}>
      <Image
        className="h-full w-1/2 object-cover"
        height={100}
        width={100}
        src={checked ? "/stars.png" : "/clouds.png"}
        alt=""
      />
      <Image
        className="h-full w-1/2 object-cover"
        height={100}
        width={100}
        src={checked ? "/stars.png" : "/clouds.png"}
        alt=""
      />
    </div>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
