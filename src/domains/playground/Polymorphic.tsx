import MarkdownContenteditable from "@/src/components/row/MarkdownContenteditable";
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  FormEvent,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useLayoutEffect,
  useState,
} from "react";
import { ContentEditableEvent } from "react-contenteditable";

type TagProp<T extends ElementType> = {
  tag?: T;
};

type TagComponentRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"];

type TagComponentProps<T extends ElementType, Props = object> = TagProp<T> &
  ComponentPropsWithoutRef<T> &
  Props;

type PolymorphicProps = {
  value?: string | undefined;
  placeholder?: string;
  className?: string;
  children?: ReactNode | string | undefined;
  onChangeValue?: (event: ContentEditableEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onInput?: (event: FormEvent<HTMLSpanElement>) => void;
} & HTMLAttributes<HTMLSpanElement>;

const Polymorphic = forwardRef(
  <T extends ElementType = "span">(
    {
      tag,
      value,
      children,
      className,
      placeholder,
      onChangeValue = (e) => console.log(e.target.value),
      onKeyDown,
      onInput,
      ...props
    }: TagComponentProps<T, PolymorphicProps>,
    ref: TagComponentRef<T>["ref"]
  ) => {
    const Comp = tag || "span";

    const [offset, setOffset] = useState<number>();

    useLayoutEffect(() => {
      if (offset !== undefined) {
        const newRange = document.createRange();
        const selection = document.getSelection();

        if (ref.current.childNodes[0])
          newRange.setStart(
            ref.current.childNodes[0],
            Math.min(offset, ref.current.childNodes[0].length as number)
          );
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }
    });

    return (
      <Comp
        ref={ref}
        className="w-full"
        //   onInput={(e) => {
        //     const range = document.getSelection()?.getRangeAt(0);
        //     if (range) setOffset(range.startOffset);
        //     if (onInput) onInput(e);
        //   }}
        {...props}
      >
        <MarkdownContenteditable
          html={value}
          placeholder={placeholder}
          className={className}
          onChange={onChangeValue}
          onKeyDown={onKeyDown}
        />
      </Comp>
    );
  }
);

Polymorphic.displayName = "Polymorphic";

export default Polymorphic;
