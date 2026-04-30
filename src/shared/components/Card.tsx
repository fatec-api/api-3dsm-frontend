import type React from "react"

interface CardProps {
  title: string
  type: string
  status: string
  responsaveis?: string[]
  buttonText?: string
  isGestor?: boolean
  showResponsavel: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Card({
  title,
  type,
  status,
  responsaveis,
  buttonText,
  onClick,
  isGestor,
  showResponsavel = false,
}: CardProps) {
  const temResponsavel = responsaveis && responsaveis.length > 0;

  return (
    <div className="flex flex-col justify-between border border-base-content/10 bg-base-100 hover:shadow-lg hover:scale-105 transition duration-300 p-6 rounded-2xl h-50 w-64">
      <div className="flex flex-row justify-between items-start">
        <h2 className="text-center text-xl font-bold mb-2">{title}</h2>
        {isGestor && onClick && (
          <div className="w-8 cursor-pointer" onClick={onClick as any}>
            <img
              alt="Atribuir item a um profissional."
              src="https://img.icons8.com/sf-black-filled/64/add-user-male.png"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-gray-600 text-sm">{type}</p>
        {status && <p className="text-gray-600 text-sm">Status: {status}</p>}

        {showResponsavel && (
          temResponsavel ? (
            <div className="text-gray-600 text-sm">
              <span>Responsável{responsaveis.length > 1 ? "is" : ""}:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {responsaveis.map((nome) => (
                  <span
                    key={nome}
                    className="bg-base-200 text-black font-semibold text-xs px-2 py-0.5 rounded-full"
                  >
                    {nome}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">Sem responsável</p>
          )
        )}
        <br />
      </div>

      {onClick && buttonText && (
        <button className="btn btn-primary btn-sm mt-3" onClick={onClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
}