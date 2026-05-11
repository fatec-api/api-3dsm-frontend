import FormCadastroCliente from "../components/FormCadastroCliente";
import Header from "../shared/components/Header";
import Navbar from "../shared/components/Navbar";

export default function TelaCadastroCliente() {
  return (
     <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
       <Navbar />
       <Header titulo="Cadastro de Cliente" />
       <div className="flex-1 flex items-center justify-center px-4">
         <FormCadastroCliente />
       </div>
     </div>
   );
}