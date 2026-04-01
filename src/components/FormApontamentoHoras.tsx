import { useEffect, useState } from "react";
import Input from "../shared/components/Input";
import Dropdown from "../shared/components/Dropdown";
import Botao from "../shared/components/Botao";

import { FiClock, FiCalendar } from "react-icons/fi";


export default function FormularioApontamento() {
   const [projeto, setProjeto] = useState("");
   const [item, setItem] = useState("");
   const [nivel, setNivel] = useState("");


   const [data, setData] = useState("");
   const [horaInicio, setHoraInicio] = useState("");
   const [horaFim, setHoraFim] = useState("");


   const [usarPausa, setUsarPausa] = useState(false);
   const [pausaInicio, setPausaInicio] = useState("");
   const [pausaFim, setPausaFim] = useState("");


   const [observacao, setObservacao] = useState("");


   const [erro, setErro] = useState("");
   const [loading, setLoading] = useState(false);
   const [mostrarPopup, setMostrarPopup] = useState(false);


   const [horasLiquidas, setHorasLiquidas] = useState<number | null>(null);


   // mock de dados
   const projetos = ["Projeto A", "Projeto B"];
   const itensPorProjeto: any = {
       "Projeto A": ["Item 1", "Item 2"],
       "Projeto B": ["Item 3"],
   };

   const nivelPorItem: any = {
       "Item 1": "Análise",
       "Item 2": "Desenvolvimento",
       "Item 3": "Teste",
   };


   const itens = projeto ? itensPorProjeto[projeto] || [] : [];


   function parseHora(h: string) {
       const [hh, mm] = h.split(":").map(Number);
       return hh * 60 + mm;
   }


   const validar = () => {
       const hoje = new Date().toISOString().split("T")[0];


       if (!projeto || !item) {
           return "Selecione projeto e item.";
       }


       if (!data || !horaInicio || !horaFim) {
           return "Preencha todos os campos obrigatórios.";
       }


       if (data > hoje) {
           return "Data não pode ser futura.";
       }


       const inicio = parseHora(horaInicio);
       const fim = parseHora(horaFim);


       if (fim <= inicio) {
           return "Hora fim deve ser maior que início.";
       }


       if (usarPausa) {
           if (!pausaInicio || !pausaFim) {
               return "Preencha a pausa completa.";
           }


           const pInicio = parseHora(pausaInicio);
           const pFim = parseHora(pausaFim);


           if (pFim <= pInicio) {
               return "Pausa inválida.";
           }


           if (pInicio < inicio || pFim > fim) {
               return "Pausa fora do horário de trabalho.";
           }
       }


       return "";
   };


   // cálculo horas liquidas
   useEffect(() => {
       if (!horaInicio || !horaFim) {
           setHorasLiquidas(null);
           return;
       }


       let total = parseHora(horaFim) - parseHora(horaInicio);


       if (usarPausa && pausaInicio && pausaFim) {
           total -= parseHora(pausaFim) - parseHora(pausaInicio);
       }


       setHorasLiquidas(total / 60);
   }, [horaInicio, horaFim, pausaInicio, pausaFim, usarPausa]);


   const limpar = () => {
       setProjeto("");
       setItem("");
       setNivel("");
       setData("");
       setHoraInicio("");
       setHoraFim("");
       setPausaInicio("");
       setPausaFim("");
       setObservacao("");
       setUsarPausa(false);
   };


   const handleSubmit = async (e: any) => {
       e.preventDefault();
       setErro("");


       const erroValidacao = validar();
       if (erroValidacao) {
           setErro(erroValidacao);
           return;
       }


       const payload = {
           projeto,
           item,
           nivel,
           data,
           horaInicio,
           horaFim,
           pausaInicio: usarPausa ? pausaInicio : null,
           pausaFim: usarPausa ? pausaFim : null,
           observacao,
       };


       try {
           setLoading(true);


           console.log("ENVIAR:", payload);


           limpar();
           setMostrarPopup(true);


           setTimeout(() => {
               setMostrarPopup(false);
           }, 3000);
       } catch (error) {
           setErro("Erro ao registrar apontamento.");
       } finally {
           setLoading(false);
       }
   };


   return (
       <>
           <form
               onSubmit={handleSubmit}
               className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-[700px] flex flex-col gap-10"
           >
               <h1 className="text-2xl font-semibold text-gray-800 text-center">
                   Apontamento de Horas
               </h1>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                   <div className="flex flex-col gap-8">


                       <Dropdown
                           label="Projeto"
                           value={projeto}
                           onChange={(e: any) => setProjeto(e.target.value)}
                           options={projetos}
                           widthPx={300}
                       />


                       <Dropdown
                           label="Item"
                           value={item}
                           onChange={(e: any) => {
                               const itemSelecionado = e.target.value;
                               setItem(itemSelecionado);
                               setNivel(nivelPorItem[itemSelecionado] || "");
                           }}
                           options={itens}
                           widthPx={300}
                       />


                       <Input
                           label="Data"
                           type="date"
                           value={data}
                           onChange={(e: any) => setData(e.target.value)}
                           icon={<FiCalendar size={18} />}
                           widthPx={300}
                       />
                   </div>


                   <div className="flex flex-col gap-8">


                       {item && nivel && (
                           <p className="text-sm text-gray-600">
                               Item selecionado: <strong>{item} - {nivel}</strong>
                           </p>
                       )}


                       <Input
                           label="Hora Início"
                           type="time"
                           value={horaInicio}
                           onChange={(e: any) => setHoraInicio(e.target.value)}
                           icon={<FiClock size={18} />}
                           widthPx={300}
                       />


                       <Input
                           label="Hora Fim"
                           type="time"
                           value={horaFim}
                           onChange={(e: any) => setHoraFim(e.target.value)}
                           icon={<FiClock size={18} />}
                           widthPx={300}
                       />
                   </div>
               </div>


               <div className="flex flex-col gap-4">
                   <label className="flex items-center gap-2">
                       <input
                           type="checkbox"
                           checked={usarPausa}
                           onChange={(e) => setUsarPausa(e.target.checked)}
                       />
                       Adicionar pausa
                   </label>


                   {usarPausa && (
                       <div className="flex gap-8">
                           <Input
                               label="Início Pausa"
                               type="time"
                               value={pausaInicio}
                               onChange={(e: any) => setPausaInicio(e.target.value)}
                               widthPx={300}
                           />


                           <Input
                               label="Fim Pausa"
                               type="time"
                               value={pausaFim}
                               onChange={(e: any) => setPausaFim(e.target.value)}
                               widthPx={300}
                           />
                       </div>
                   )}
               </div>


               {horasLiquidas !== null && (
                   <p className="text-center text-sm">
                       Horas líquidas: <strong>{horasLiquidas.toFixed(2)}h</strong>
                   </p>
               )}


               {erro && (
                   <p className="text-red-600 text-sm text-center">
                       {erro}
                   </p>
               )}


               <div className="flex flex-col items-center gap-6">
                   <Botao type="submit" disabled={loading}>
                       {loading ? "Salvando..." : "Apontar"}
                   </Botao>
               </div>


               {mostrarPopup && (
                   <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg z-[9999]">
                       Apontamento realizado com sucesso!
                   </div>
               )}
           </form>
       </>
   );
}

