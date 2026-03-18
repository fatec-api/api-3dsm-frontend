import React from "react";

type InputProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "number";
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  widthPx?: number; 
  heightPx?: number; 
};

export default function Input({
  label,
  name = "",
  placeholder,
  value = "",
  onChange = () => {},
  type = "text",
  icon,
  rightIcon,
  widthPx = 300,
  heightPx = 36,
}: InputProps) {
  return (
    <div className="flex justify-center w-full">
      <div style={{ width: `${widthPx}px` }} className="flex flex-col">
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div
          className="flex items-center border border-gray-300 rounded-lg px-2 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition duration-200"
          style={{ height: `${heightPx}px` }}
        >
          {icon && <div className="mr-2 text-gray-600">{icon}</div>}

          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="flex-1 outline-none bg-transparent placeholder-gray-400 text-sm"
          />

          {rightIcon && <div className="ml-2">{rightIcon}</div>}
        </div>
      </div>
    </div>
  );
}