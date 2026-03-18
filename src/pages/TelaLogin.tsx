import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Input from "../shared/components/Input";
import Botao from "../shared/components/Botao";


export default function TelaLogin() {
 const [email, setEmail] = useState("");
 const [senha, setSenha] = useState("");
 const [erro, setErro] = useState("");
 const [mostrarSenha, setMostrarSenha] = useState(false);


 const handleLogin = (e: React.FormEvent) => {
   e.preventDefault();


   setErro("");


   if (!email || !senha) {
     setErro("Preencha todos os campos.");
     return;
   }


   if (!email.includes("@")) {
     setErro("E-mail inválido.");
     return;
   }


   if (senha.length < 8) {
       setErro("A senha deve ter no mínimo 8 caracteres.");
       return;
   }  


   alert("Login realizado com sucesso!");


   setTimeout(() => {
   setEmail("");
   setSenha("");
   },500);
 };


 return (
   <div className="flex h-screen bg-[#FFFFFF]">


     <div className="w-1/2 flex flex-col justify-center items-start pl-32">


       <h1 className="text-3xl font-bold mb-6 text-gray-800">
         Seja Bem vindo!
       </h1>


       <form onSubmit={handleLogin} className="flex flex-col gap-6 w-80">
         <div>
           <label className="block mb-2 font-medium">E-mail</label>


           <Input
             type="email"
             placeholder="email@gmail.com"
             value={email}
             onChange={(e: any) => setEmail(e.target.value)}
             icon={<FiMail size={18} />}
           />
         </div>
         <div>
           <label className="block mb-2 font-medium">Senha</label>


           <Input
             type={mostrarSenha ? "text" : "password"}
             placeholder="************"
             value={senha}
             onChange={(e: any) => setSenha(e.target.value)}
             icon={<FiLock size={18} />}
             rightElement={
               <button
                 type="button"
                 onClick={() => setMostrarSenha(!mostrarSenha)}
               >
                 {mostrarSenha ? (
                   <FiEye size={18} />
                 ) : (
                   <FiEyeOff size={18} />
                 )}
               </button>
             }
           />
         </div>


         {erro && (
           <p className="text-red-600 text-sm">
             {erro}
           </p>
         )}


         <Botao type="submit">
           Login
         </Botao>


       </form>


     </div>


       <div className="w-1/2 flex items-center justify-center relative bg-[#FFFFFF] overflow-hidden">
           <div className="absolute bottom-[5px] right-[350px] w-[500px] h-[800px] bg-[#F0F0F0] rounded-t-[250px]" />
               <img
               src=" "
               alt="logo gsw"
               className="relative w-80 z-10"
               />
       </div>
   </div>
 );
}
