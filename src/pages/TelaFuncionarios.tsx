import Card from "../shared/components/Card";

export default function TelaFuncionarios() {

    const handleClick = () => {

    }

    return (
        <>
            {/* ajustar gap */}
            <div className="flex flex-row flex-wrap justify-center gap-x-10 gap-y-4 bg-gray-400 p-3">
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" isGestor={true} onClick={handleClick} />
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" isGestor={true} onClick={handleClick} />
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" isGestor={true} onClick={handleClick} />
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" isGestor={true} onClick={handleClick} />
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" />
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" />
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" />
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" />
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" buttonText="Excluir" onClick={handleClick}/>
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" buttonText="Excluir" onClick={handleClick}/>
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" buttonText="Excluir" onClick={handleClick}/>
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" buttonText="Excluir" onClick={handleClick}/>
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" isGestor={true} buttonText="Excluir" onClick={handleClick}/>
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" isGestor={true} buttonText="Excluir" onClick={handleClick}/>
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" isGestor={true} buttonText="Excluir" onClick={handleClick}/>
                <Card title="Projeto X" type="xxxxxxxxxx" status="-----" isGestor={true} buttonText="Excluir" onClick={handleClick}/>
            </div>
        </>
    )
}