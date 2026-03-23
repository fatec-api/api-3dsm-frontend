type Props = {
  children: React.ReactNode;
  type?: "button" | "submit";
};

export default function Botao({ children, type = "button" }: Props) {
  return (
    <button
      type={type}
      className="border-2 border-black rounded-xl h-10 px-6 yx-3 mt-2 bg-white hover:bg-gray-100"
    >
      {children}
    </button>
  );
}