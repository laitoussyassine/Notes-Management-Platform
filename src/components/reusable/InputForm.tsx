import { Input, InputProps } from "@/components/ui/input";
import React from "react";

interface InputFormProps extends InputProps {
  className?: string;
  value?: any;
}

const InputForm: React.FC<InputFormProps> = ({ className, value, ...restProps }) => {
  return (
    <>
      <Input type="text" className={className} value={value} {...restProps} />
    </>
  );
};

export default InputForm;
