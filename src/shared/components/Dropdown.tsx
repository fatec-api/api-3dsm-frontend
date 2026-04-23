import React from "react";

type DropdownOption = string | { label: string; value: string };

type SelectProps = {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: DropdownOption[];
  icon?: React.ReactNode;
  widthPx?: number;
  heightPx?: number;
  required?: boolean;
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
  required = true,
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
          className="flex items-center border border-gray-300 rounded-xl px-3 bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-200 transition duration-200"
          style={{ height: `${heightPx}px` }}
        >
          {icon && (
            <div className="mr-3 text-gray-600 flex items-center">{icon}</div>
          )}
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="flex-1 outline-none bg-transparent text-gray-700 appearance-none cursor-pointer py-2"
          >
            <option value="" disabled hidden>
              Selecione
            </option>
            {options.map((op, index) => {
              // ✅ union: trata string simples e objeto {label, value}
              const label = typeof op === "string" ? op : op.label;
              const val = typeof op === "string" ? op : op.value;
              return (
                <option key={index} value={val}>
                  {label}
                </option>
              );
            })}
          </select>
          <div className="ml-2 text-gray-500 pointer-events-none">▼</div>
        </div>
      </div>
    </div>
  );
}