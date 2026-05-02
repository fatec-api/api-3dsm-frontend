import Navbar from "../shared/components/Navbar";
import Header from "../shared/components/Header";
import FormCadastroItem from "../components/FormCadastroItem";

export default function CadastroItem() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <Header titulo="Cadastro de Atividade" />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <FormCadastroItem />
      </div>
    </div>
  );
}