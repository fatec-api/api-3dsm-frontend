import type React from "react"

interface CardProps {
    title: string
    type: string
    status: string
    responsavel?: string | string[]
    buttonText?: string
    isGestor?: boolean
    showResponsavel: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Card({ title, type, status, responsavel, buttonText, onClick, isGestor, showResponsavel = false }: CardProps) {
    return (
        <div className="flex flex-col justify-between border border-base-content/10 bg-base-100 hover:shadow-lg hover:scale-105 transition duration-300 p-6 rounded-2xl w-64">

    <div className="flex flex-row justify-between items-start">
        <h2 className="text-xl font-bold mb-2 break-words">{title}</h2>

        {isGestor && (
            <div className="w-8 cursor-pointer" onClick={onClick as any}>
                <img
                    alt="Atribuir item a um profissional."
                    src="https://img.icons8.com/sf-black-filled/64/add-user-male.png"
                />
            </div>
        )}
    </div>

    <div className="flex flex-col gap-1">
        <p className="text-gray-600 text-sm break-words">{type}</p>

        {status && (
            <p className="text-gray-600 text-sm break-words">
                Status: {status}
            </p>
        )}

        {showResponsavel && (
            responsavel ? (
                <p className="text-gray-600 text-sm break-words">
                    Responsável:{" "}
                    <span className="font-semibold text-black">
                        {Array.isArray(responsavel)
                            ? responsavel.join(", ")
                            : responsavel}
                    </span>
                </p>
            ) : (
                <p className="text-gray-500 text-sm italic">
                    Sem responsável
                </p>
            )
        )}
    </div>

    {onClick && buttonText && (
        <button className="btn btn-primary btn-sm mt-3" onClick={onClick}>
            {buttonText}
        </button>
    )}

</div>
    )
}