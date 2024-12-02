import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  FormEvent,
  forwardRef,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type AsProp<T extends React.ElementType> = {
  as?: T;
};

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"];

type PolymorphicComponentProps<
  T extends ElementType,
  Props = object,
> = AsProp<T> &
  ComponentPropsWithoutRef<T> &
  Props & {
    ref?: PolymorphicRef<T>;
  };

type Props = {
  value?: string | undefined;
  onInput?: (e: FormEvent<HTMLSpanElement>) => void;
  placeholder?: string;
  className?: string;
  children?: ReactNode | string | undefined;
};

type ComponentProps<T extends ElementType> = PolymorphicComponentProps<
  T,
  Props
>;

const Polymorphic = forwardRef(
  <T extends ElementType = "span">(
    {
      as,
      value,
      onInput,
      children,
      className = "",
      placeholder = "글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요",
      ...props
    }: ComponentProps<T>,
    ref: PolymorphicRef<T>["ref"]
  ) => {
    const Component = as || "span";

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

    useEffect(() => {
      console.log(ref.current);
    }, [value, ref]);

    const placeholderStyle =
      value && value.length > 0
        ? "text-black"
        : "content-[attr(placeholder)] block text-gray-300";
    const asStyle =
      as === "ul"
        ? "list-disc list-inside"
        : as === "ol"
          ? "list-decimal list-inside"
          : "";

    return (
      <Component
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        placeholder={placeholder}
        onInput={(e) => {
          const range = document.getSelection()?.getRangeAt(0);
          if (range) setOffset(range.startOffset);
          if (onInput) onInput(e);
        }}
        className={`w-full ${placeholderStyle} ${asStyle} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Polymorphic.displayName = "Polymorphic";

export default Polymorphic;
