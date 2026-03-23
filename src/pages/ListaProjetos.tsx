import Header from "../shared/components/Header"

export default function ListaProjetos() {

    // dados mockados para simular os projetos
    const projetos = [
        {
            nomeProjeto: "Projeto A",
            tipoProjeto: "Alocação",
            status: "Em andamento"
        },
        {
            nomeProjeto: "Projeto B",
            tipoProjeto: "Hora Fechada",
            status: "Em andamento"
        },{
            nomeProjeto: "Projeto C",
            tipoProjeto: "Alocação",
            status: "Concluído"
        },
        {
            nomeProjeto: "Projeto D",
            tipoProjeto: "Hora Fechada",
            status: "Em andamento"
        },{
            nomeProjeto: "Projeto W",
            tipoProjeto: "Alocação",
            status: "Planejamento"
        },
        {
            nomeProjeto: "Projeto X",
            tipoProjeto: "Hora Fechada",
            status: "Planejamento"
        },{
            nomeProjeto: "Projeto Y",
            tipoProjeto: "Alocação",
            status: "Em andamento"
        },
        {
            nomeProjeto: "Projeto Z",
            tipoProjeto: "Hora Fechada",
            status: "Concluído"
        },
    ]
    return (
        <div className="flex h-screen bg-[#FFFFFF]">
            <Header />
            <div className="flex mt-40 gap-6 w-full justify-center flex-wrap">
                {projetos.map((projeto) => (
                    <div className="card hover:shadow-lg rounded-xl border bg-base-100 card-md shadow-sm w-60 h-40">
                        <div className="card-body">
                            <h1 className="text-lg font-bold text-center pb-5">{projeto.nomeProjeto}</h1>
                            <h3 className="text-sm">{projeto.tipoProjeto}</h3>
                            <h3 className="text-sm">{projeto.status}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}