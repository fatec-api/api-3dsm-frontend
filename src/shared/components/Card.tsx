interface CardProps {
    title: String
    type: String
    status: String
    buttonText?: String
    onClick?: any
    hasButton: boolean
}

export default function Card({ title, type, buttonText, onClick, hasButton }: CardProps) {
    return (
        <div className="card w-96 bg-base-100 card-lg shadow-sm">
            <div className="card-body">
                <div className="flex flex-row justify-between">
                    <h2 className="card-title">{title}</h2>
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.icons8.com/material-rounded/48/user.png" />
                    </div>
                </div>
                <p>Tipo: {type}</p>
                <div className="justify-end card-actions">
                    {/* {if ({hasButton} === true) {}} */}
                    <button className="btn btn-primary" onClick={onClick}>{buttonText}</button>
                </div>
            </div>
        </div>
    )
}
