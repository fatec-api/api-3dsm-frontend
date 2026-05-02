import React from "react";

type InputProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "number" | "date" | "double" | "datetime-local";
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  widthPx?: number;
  heightPx?: number;
  maxLength?: number;
  required?: boolean;
};

export default function Input({
  label,
  name = "",
  placeholder,
  value = "",
  onChange = () => {},
  type = "text",
  icon,
  rightElement,
  widthPx = 320,
  heightPx = 48,
  required = true

}: InputProps) {
  return (
    <div className="flex justify-center w-full">
      
      <div style={{ width: `${widthPx}px` }} className="flex flex-col">

        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div
          className="flex items-center border border-gray-300 rounded-xl px-3 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-200 transition duration-200"
          style={{ height: `${heightPx}px` }}
        >
          {icon && (
            <div className="mr-3 text-gray-600 flex items-center">
              {icon}
            </div>
          )}

          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="flex-1 outline-none bg-transparent placeholder-gray-400"
            required={required}
          />
          
          {rightElement && (
            <div className="ml-2 flex items-center cursor-pointer">
              {rightElement}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}