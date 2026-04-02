import type React from "react"

interface CardProps {
    title: string
    type: string
    status: string
    buttonText?: string
    isGestor?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Card({ title, type, status, buttonText, onClick, isGestor }: CardProps) {
    return (
        <div className="flex flex-col justify-between border hover:shadow-lg hover:transform hover:scale-105 hover:transition hover:duration-300 p-6 rounded-lg h-50 w-64">
            <h2 className="text-center text-xl font-bold mb-2">{title}</h2>
            <div>
                <p className="text-gray-600">Tipo: {type}</p>
                <p className="text-gray-600">Status: {status}</p>
            </div>
            {onClick && isGestor && (
                <div className="w-10 rounded-full cursor-pointer">
                    <img
                        alt="Alocar funcionário ao projeto."
                        src="https://img.icons8.com/sf-black-filled/64/add-user-male.png"
                    />
                </div>
            )}
            {onClick && buttonText && (
                <button className="btn btn-primary mt-2" onClick={onClick}>
                    {buttonText}
                </button>
            )}
        </div>
    )
}