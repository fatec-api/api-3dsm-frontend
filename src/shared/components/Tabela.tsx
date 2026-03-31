type Log = {
  projeto: string;
  item: string;
  nivel: string;
  data: string;
  inicio: string;
  fim: string;
};

export default function Tabela() {
  const logs: Log[] = [
    {
      projeto: "Projeto A",
      item: "Item 1",
      nivel: "Alto",
      data: "30/03/2026",
      inicio: "08:00",
      fim: "12:00",
    },
    {
      projeto: "Projeto B",
      item: "Item 2",
      nivel: "Médio",
      data: "29/03/2026",
      inicio: "13:00",
      fim: "17:00",
    },
  ];

  return (
    <div className="border rounded-2xl overflow-hidden">
      <table className="w-full text-center border-collapse">

        {/* Cabeçalho */}
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-3">Projeto</th>
            <th className="border p-3">Item</th>
            <th className="border p-3">Nível da atividade</th>
            <th className="border p-3">Data do Apontamento</th>
            <th className="border p-3">Hora início</th>
            <th className="border p-3">Hora fim</th>
          </tr>
        </thead>

        {/* Corpo */}
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td className="border p-3">{log.projeto}</td>
              <td className="border p-3">{log.item}</td>
              <td className="border p-3">{log.nivel}</td>
              <td className="border p-3">{log.data}</td>
              <td className="border p-3">{log.inicio}</td>
              <td className="border p-3">{log.fim}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}