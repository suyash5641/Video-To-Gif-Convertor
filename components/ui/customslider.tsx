// "use client";

// import * as React from "react";
// import * as SliderPrimitive from "@radix-ui/react-slider";

// import { cn } from "@/lib/utils";

// const CustomSlider = React.forwardRef<
//   React.ElementRef<typeof SliderPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
// >(({ className, ...props }, ref) => (
//   <SliderPrimitive.Root
//     ref={ref}
//     className={cn(
//       "relative flex w-full touch-none select-none items-center",
//       className
//     )}
//     {...props}
//   >
//     <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
//       <SliderPrimitive.Range className="absolute h-full bg-primary" />
//     </SliderPrimitive.Track>

//     <SliderPrimitive.Thumb className="block h-6 w-0.5 bg-primary mx-2 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
//   </SliderPrimitive.Root>
// ));
// CustomSlider.displayName = SliderPrimitive.Root.displayName;

// export { CustomSlider };
"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const CustomSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    {/* Track (Invisible) */}
    <SliderPrimitive.Track className="relative h-0 w-full grow" />

    {/* Thumb (Vertical Line) */}
    <SliderPrimitive.Thumb
      className="block h-[70px] w-1 bg-white mx-2 rounded-md 
    disabled:pointer-events-none disabled:opacity-50"
    />

    {/* <SliderPrimitive.Thumb className="block h-[56px] w-1 bg-white mx-2 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" /> */}
  </SliderPrimitive.Root>
));
CustomSlider.displayName = SliderPrimitive.Root.displayName;

export { CustomSlider };
