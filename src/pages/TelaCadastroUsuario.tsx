import Navbar from "../shared/components/Navbar";
import Header from "../shared/components/Header";
import FormularioCadastro from "../components/FormCadastroUsuario";

export default function CadastroUsuario() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <Header titulo="Cadastro de Usuário" />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <FormularioCadastro />
      </div>
    </div>
  );
}