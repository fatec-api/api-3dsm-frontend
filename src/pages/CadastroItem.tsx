import Navbar from "../shared/components/Navbar";
import Header from "../shared/components/Header";
import FormCadastroItem from "../components/FormCadastroItem";

export default function CadastroItem() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar />
      <Header titulo="Cadastro de Atividade" />
      <div className="flex-1 flex items-center justify-center px-4">
        <FormCadastroItem />
      </div>
    </div>
  );
}