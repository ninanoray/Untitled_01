import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Props = undefined;

type MutableElementProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, keyof Props>;

const Mutable = <T extends ElementType = "div">({
  as,
  children,
  ...props
}: MutableElementProps<T>) => {
  const Component = as || "div";
  return (
    <Component contentEditable {...props}>
      {children}
    </Component>
  );
};

export default Mutable;
