import React from "react";
import { FunctionComponent, ComponentPropsWithoutRef } from "react";
// ComponentPropsWithoutRef - встроенный тип, с помощью которого можем
// получить все атрибуты, которые есть у элемента <button>
// и использовать их внутри компонента в качестве props.

import "../../style/ui/button.scss";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  btnText: string;
}

const Button: FunctionComponent<ButtonProps> = ({ btnText, ...props }) => {
  return (
    <button className="uppercase-text base-button dark-button" {...props}>
      {btnText}
    </button>
  );
};

export default Button;
