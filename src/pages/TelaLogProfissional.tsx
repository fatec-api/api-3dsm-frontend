import Header from "../shared/components/Header";
import Navbar from "../shared/components/Navbar";
import Tabela from "../shared/components/Tabela";

export default function Logs() {
  return (
    <div className="min-h-screen bg-base-100">

      {/* Header */}
      <Header />

      

      {/* Conteúdo */}
      <div className="flex justify-center mt-32 px-6">
        <div className="w-full max-w-6xl border-2 rounded-3xl p-10">

          <h1 className="text-center text-2xl font-medium mb-10">
            Meus Últimos Apontamentos
          </h1>

          <Tabela />

        </div>
      </div>
    </div>
  );
}