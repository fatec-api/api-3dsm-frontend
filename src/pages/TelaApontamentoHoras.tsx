import Header from "../shared/components/Header";
import FormularioApontamentoHoras from "../components/FormApontamentoHoras";


export default function ApontamentoHoras() {
 return (
   <div className="min-h-screen flex flex-col">
     <Header />


     <div className="flex-1 flex items-center justify-center my-10">
       <FormularioApontamentoHoras/>
     </div>
   </div>
 );
}
