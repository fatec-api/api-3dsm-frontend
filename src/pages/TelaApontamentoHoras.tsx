import Header from "../shared/components/Header";
import FormularioApontamentoHoras from "../components/FormApontamentoHoras";


export default function ApontamentoHoras() {
 return (
   <div className="h-screen flex flex-col">
     <Header />


     <div className="flex-1 flex items-center justify-center px-4">
       <FormularioApontamentoHoras/>
     </div>
   </div>
 );
}
