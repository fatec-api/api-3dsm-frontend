type Props = {
  children: React.ReactNode;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function Botao({
  children,
  type = "button",
  variant = "secondary", // define a variante padrão
  disabled = false,
  onClick,
}: Props) {
  
  const base =
    "w-full h-11 px-6 rounded-xl font-medium transition-all duration-200 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-[#173052] text-white hover:bg-[#1f3f6a] hover:shadow-md", // botão azul marinho
    
    secondary:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50", // botão branco com borda cinza
    
    ghost:
      "bg-transparent text-gray-600 hover:bg-gray-100", // botão transparente com hover cinza claro
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}