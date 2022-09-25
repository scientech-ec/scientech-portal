import React from "react";
import { ErrorMessage, Field } from "formik";

interface Props {
  name: string;
  type: string;
  placeholder: string;
  className?: string;
}

const Input: React.FC<Props> = ({ name, type, className, placeholder }) => {
  return (
    <div className={`relative`}>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full border-2 py-3 px-6 text-lg focus:outline-none ${className}`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="absolute bottom-0 left-6 text-xs text-red-500"
      />
    </div>
  );
};

export default Input;
