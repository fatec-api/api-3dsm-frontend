export default function ApontamentosGestor() {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-lg p-15">
                    <thead>
                        <tr className="text-lg">
                            <th></th>
                            <th>Usuário</th>
                            <th>Projeto</th>
                            <th>Atividade</th>
                            <th>Nível da Atividade</th>
                            <th>Data do Apontamento</th>
                            <th>Hora Ínicio</th>
                            <th>Hora Fim</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-sm">
                            <th className="p-1 text-center"><input type="checkbox" className="checkbox" /></th>
                            <td>Carlos</td>
                            <td>GSW1234</td>
                            <td>CRUD</td>
                            <td>tester</td>
                            <td>09/04/2026</td>
                            <td>09:00</td>
                            <td>11:00</td>
                            <td>Pendente</td>
                        </tr>
                        <tr className="text-sm">
                            <th className="p-1 text-center"><input type="checkbox" className="checkbox" /></th>
                            <td>Carlos</td>
                            <td>GSW1234</td>
                            <td>CRUD</td>
                            <td>tester</td>
                            <td>09/04/2026</td>
                            <td>09:00</td>
                            <td>11:00</td>
                            <td>Pendente</td>
                        </tr>
                        <tr className="text-sm">
                            <th className="p-1 text-center"><input type="checkbox" className="checkbox" /></th>
                            <td>Carlos</td>
                            <td>GSW1234</td>
                            <td>CRUD</td>
                            <td>tester</td>
                            <td>09/04/2026</td>
                            <td>09:00</td>
                            <td>11:00</td>
                            <td>Pendente</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}