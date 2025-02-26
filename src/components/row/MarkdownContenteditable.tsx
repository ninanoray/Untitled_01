import { cn } from "@/src/lib/tailwindMerge";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  RefObject,
} from "react";
import ContentEditable from "react-contenteditable";

type Props = {
  html: string | undefined;
  placeholder?: string;
  className?: string | undefined;
};

const MarkdownContenteditable = forwardRef<
  ElementRef<typeof ContentEditable>,
  Omit<ComponentPropsWithoutRef<typeof ContentEditable>, "html"> & Props
>(
  (
    {
      html = "",
      tagName = "p",
      placeholder = "글을 작성하거나 마크다운 텍스트를 입력하세요",
      className,
      ...props
    },
    ref
  ) => {
    const placeholderStyle = "content-[attr(placeholder)]";

    return (
      <div className={cn("w-full px-3", ProseClassName, className)}>
        <ContentEditable
          innerRef={ref as RefObject<HTMLElement>}
          html={html}
          tagName={tagName}
          placeholder={placeholder}
          className={cn(html || placeholderStyle)}
          {...props}
        />
      </div>
    );
  }
);

MarkdownContenteditable.displayName = "MarkdownContenteditable";

export default MarkdownContenteditable;

export const ProseClassName = [
  "prose prose-sm dark:prose-invert max-w-none",
  "prose-p:m-0 prose-p:p-0",
  "prose-ul:m-0 prose-ol:m-0",
  "prose-li:m-0 prose-li:p-0 prose-li:marker:text-foreground/80",
  "prose-hr:mt-[0.9em] prose-hr:mb-[0.5em] prose-hr:border-foreground/50",
  "prose-pre:w-full",
];
