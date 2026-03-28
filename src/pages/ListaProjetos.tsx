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

    function renderizarProjetos() {
        if (projetos.length === 0) {
            return (
                <div role="alert" className="alert alert-info alert-soft h-15">
                    <p className="text-lg">Nenhum projeto encontrado.</p>
                </div>
            )
        } else {
            return projetos.map((projeto, index) => (
                <div key={index} className="flex flex-col justify-between border hover:shadow-lg hover:transform hover:scale-105 hover:transition hover:duration-300 p-6 rounded-lg h-50 w-64">
                    <h2 className="text-center text-xl font-bold mb-2">{projeto.nomeProjeto}</h2>
                    <div>
                        <p className="text-gray-600">Tipo: {projeto.tipoProjeto}</p>
                        <p className="text-gray-600">Status: {projeto.status}</p>
                    </div>
                </div>
            ))
        }
    }
    return (
        <div className="flex h-screen bg-[#FFFFFF]">
            <Header />
            <div className="flex mt-40 gap-6 w-full justify-center flex-wrap">
                {renderizarProjetos()}
            </div>
        </div>
    );
}