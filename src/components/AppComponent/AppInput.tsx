import React from "react";
import { Field, ErrorMessage } from "formik";

interface GlobalInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  as?: "input" | "select" | "textarea";
  children?: React.ReactNode; // For select options
  optional?: boolean;
}

const AppInput: React.FC<GlobalInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  as = "input",
  children,
  optional = false,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}{" "}
        {optional && <span className="text-gray-400 text-xs">(optional)</span>}
      </label>

      <Field
        as={as}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
      >
        {children}
      </Field>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 text-sm mt-1"
      />
    </div>
  );
};

export default AppInput;
