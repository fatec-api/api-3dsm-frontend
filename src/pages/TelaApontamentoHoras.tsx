import Navbar from "../shared/components/Navbar";
import Header from "../shared/components/Header";
import FormularioApontamentoHoras from "../components/FormApontamentoHoras";


export default function ApontamentoHoras() {
 return (
   <div className="h-screen flex flex-col bg-white">
     <Navbar />
     <Header titulo="Cadastro de Usuário" />


     <div className="flex-1 flex items-center justify-center px-4">
       <FormularioApontamentoHoras/>
     </div>
   </div>
 );
}
