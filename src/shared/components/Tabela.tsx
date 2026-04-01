type Column = {
  header: string;
  accessor: string;
};

type TabelaProps<T> = {
  data: T[];
  columns: Column[];
  emptyMessage?: string;
};

export default function Tabela<T>({
  data,
  columns,
  emptyMessage = "Nenhum registro encontrado",
}: TabelaProps<T>) {
  return (
    <div className="overflow-x-auto">
      {data.length === 0 ? (
        <div role="alert" className="alert alert-info">
          <span>{emptyMessage}</span>
        </div>
      ) : (
        <div className="border rounded-2xl overflow-hidden">
          <table className="w-full text-center border-collapse">
            
            
            <thead className="bg-gray-200 text-black">
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className="border p-3">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>

            
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="border p-3">
                      {String(row[col.accessor as keyof T])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}