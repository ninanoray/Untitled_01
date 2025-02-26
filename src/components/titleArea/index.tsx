import * as React from "react";

import { cn } from "@/src/lib/tailwindMerge";

const Titlearea = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md bg-background px-3 py-2 text-3xl placeholder:text-3xl placeholder:text-gray-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-3xl",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Titlearea.displayName = "Titlearea";

export { Titlearea };
