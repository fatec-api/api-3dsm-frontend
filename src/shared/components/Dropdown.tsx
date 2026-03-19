import React from "react";

type SelectProps = {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  icon?: React.ReactNode;
  widthPx?: number;
  heightPx?: number;
};

export default function Dropdown({
  label,
  name = "",
  value = "",
  onChange = () => {},
  options,
  icon,
  widthPx = 320,
  heightPx = 48,
}: SelectProps) {
  return (
    <div className="flex justify-center w-full">
      
      <div style={{ width: `${widthPx}px` }} className="flex flex-col">

        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div
          className="flex items-center border-2 border-gray-300 rounded-xl px-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition duration-200"
          style={{ height: `${heightPx}px` }}
        >
          {icon && (
            <div className="mr-3 text-gray-600 flex items-center">
              {icon}
            </div>
          )}

          <select
            name={name}
            value={value}
            onChange={onChange}
            className="flex-1 outline-none bg-transparent text-gray-700 appearance-none cursor-pointer"
          >
            <option value="">Selecione</option>
            {options.map((op, index) => (
              <option key={index} value={op}>
                {op}
              </option>
            ))}
          </select>
          
          <div className="ml-2 text-gray-500 pointer-events-none">
            ▼
          </div>

        </div>

      </div>
    </div>
  );
}