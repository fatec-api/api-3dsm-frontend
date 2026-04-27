type Props = {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function Botao({ 
  children, 
  type = "button", 
  disabled = false, 
  onClick,
  className = "" 
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`border-2 border-black rounded-xl h-10 px-6 mt-2 bg-white hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}