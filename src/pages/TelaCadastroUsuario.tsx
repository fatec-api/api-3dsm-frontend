import Navbar from "../shared/components/Navbar";
import Header from "../shared/components/Header";
import FormularioCadastro from "../components/FormCadastroUsuario";


export default function CadastroUsuario() {
 return (
   <div className="h-screen flex flex-col bg-white">
     <Navbar />
     <Header titulo="Cadastro de Usuário" />


     <div className="flex-1 flex items-center justify-center px-4">
       <FormularioCadastro />
     </div>
   </div>
 );
}
