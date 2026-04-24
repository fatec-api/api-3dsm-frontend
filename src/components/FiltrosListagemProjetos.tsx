export default function FiltrosListagemProjetos() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-5 mb-4">
            <div className="flex items-center space-x-2 p-2 mb-2 md:mb-0">
                <label htmlFor="filtro-tipo" className="text-sm font-medium">
                    Tipo de Projeto:
                </label>
                <select
                    id="filtro-tipo"
                    className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todos</option>
                    <option value="Desenvolvimento">Desenvolvimento</option>
                    <option value="Pesquisa">Pesquisa</option>
                    <option value="Manutenção">Manutenção</option>
                </select>
            </div>
            <div className="flex items-center space-x-2 p-2">
                <label htmlFor="filtro-status" className="text-sm font-medium">
                    Status:
                </label>
                <select
                    id="filtro-status"
                    className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todos</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Pendente">Pendente</option>
                </select>
            </div>
        </div>
    );
}