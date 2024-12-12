import * as React from "react";

import { tm } from "@/src/lib/tailwindMerge";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={tm(
        "flex w-full rounded-md border-none bg-background px-3 py-2 text-base placeholder:text-gray-300 focus-visible:outline-none resize-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
