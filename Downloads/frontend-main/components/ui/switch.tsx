"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  noSwitch?: boolean;
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, noSwitch, ...props }, ref) => {
    const path = usePathname();
    const isRtl =true

    return (
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex h-5 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          {
            // Always set background to 'main' if noSwitch is true
            "bg-main": noSwitch,
            // Otherwise handle the state-based background
            "data-[state=checked]:bg-main data-[state=unchecked]:bg-gray-200": !noSwitch,
            // RTL handling
            "rtl-switch": isRtl,
          },
          className
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-gray-50 shadow-lg ring-0 transition-transform",
            {
              "data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0": !isRtl,
              "data-[state=checked]:-translate-x-7 data-[state=unchecked]:translate-x-0": isRtl, // Invert translation for RTL
            }
          )}
        />
      </SwitchPrimitives.Root>
    );
  }
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
