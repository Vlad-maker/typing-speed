import { ComponentPropsWithoutRef } from "react";

import "../../style/ui/select.scss";

// Тут нам также, как и в компоненте Button потребуется
// тип ComponentPropsWithoutRef, чтобы мы могли получить все атрибуты
// элемента select. В качестве props компонент будет принимать значение по
// умолчанию и массив значений. Возвращать будет один элемент select.

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  defaultValue: string;
  options: {
    value: string;
    name: string;
  }[];
}

const Select: React.FC<SelectProps> = ({ defaultValue, options, ...props }) => {
  return (
    <select
      className="uppercase-text paragraph select"
      defaultValue={defaultValue}
      {...props}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
