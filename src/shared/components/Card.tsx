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
        <div className="card w-96 bg-base-100 card-lg shadow-sm">
            {/* padding padrao foi alterado */}
            <div className="card-body pt-6">
                <div className="flex flex-row justify-between">
                    <h2 className="card-title">{title}</h2>
                    {/* alocação da gestão */}
                    {onClick && isGestor && (
                    <div className="w-10 rounded-full cursor-pointer">
                        <img
                            alt="Alocar funcionário ao projeto."
                            src="https://img.icons8.com/sf-black-filled/64/add-user-male.png" />
                    </div>
                    )}
                </div>
                <p>Tipo: {type}</p>
                <p>Status: {status}</p>
                <div className="justify-end card-actions">
                    {/* botão que pode ser útil */}
                    {onClick && buttonText && (
                        <button className="btn btn-primary">{buttonText}</button>
                    )}
                </div>
            </div>
        </div>
    )
}
