import { useEffect, useState } from "react";
import Input from "../shared/components/Input";
import Dropdown from "../shared/components/Dropdown";
import Botao from "../shared/components/Botao";

import { FiClock, FiCalendar } from "react-icons/fi";
import { listarProjetos } from "../services/listService";

export default function FormularioApontamento() {
   const [projeto, setProjeto] = useState("");
   const [item, setItem] = useState("");
   const [itemSelecionado, setItemSelecionado] = useState<any>(null);

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

   // const [projetos, setProjetos] = useState<{ nomeProjeto: string }[]>([]);
   const [itens, setItens] = useState<string[]>([]);

   // useEffect(() => {
   //     const loadData = async () => {
   //         try {
   //             const listaProjetos = await listarProjetos();
   //             setProjetos(listaProjetos);
   //         } catch (error) {
   //             console.error("Erro ao carregar dados", error);
   //         }
   //     };
   //     loadData();
   // }, []);

   // mock de dados (remover após integração com backend)
   const projetos = ["Projeto A", "Projeto B"];
   const itensPorProjeto: any = {
       "Projeto A": ["Item 1 - Análise", "Item 2 - Desenvolvimento"],
       "Projeto B": ["Item 3 - Teste"],
   };

   // Temporário: usar mock até backend estar pronto
   useEffect(() => {
       if (projeto && itensPorProjeto[projeto]) {
           setItens(itensPorProjeto[projeto]);
       } else {
           setItens([]);
           setItem("");
       }
   }, [projeto]);


   function parseHora(h: string) {
       const apenasHora = h.includes("T") ? h.split("T")[1] : h;
       const [hh, mm] = apenasHora.split(":").map(Number);
       return hh * 60 + mm;
   }


   const validar = () => {
       const hoje = new Date().toISOString().split("T")[0];


       if (!projeto || !item) {
           return "Selecione projeto e item.";
       }


       if (!data || !item || !horaInicio || !horaFim) {
           return "Preencha todos os campos obrigatórios.";
       }


       if (data > hoje) {
           return "Data não pode ser futura.";
       }

       const dataHoraInicio = new Date(horaInicio);
       const dataHoraFim = new Date(horaFim);

       if (dataHoraFim <= dataHoraInicio) {
           return "Hora fim deve ser maior que início.";
       }


       if (usarPausa) {
           if (!pausaInicio || !pausaFim) {
               return "Preencha a pausa completa.";
           }

           const dataHoraPausaInicio = new Date(pausaInicio);
           const dataHoraPausaFim = new Date(pausaFim);

           if (dataHoraPausaFim <= dataHoraPausaInicio) {
               return "Pausa inválida.";
           }

           if (dataHoraPausaInicio < dataHoraInicio || dataHoraPausaFim > dataHoraFim) {
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
           itemId: itemSelecionado?.id,
           nivel: item.includes(" - ") ? item.split(" - ")[1].trim() : "",
           dataApontamento: data,
           horaInicio,
           horaFim,
           pausaInicio: usarPausa ? pausaInicio : null,
           pausaFim: usarPausa ? pausaFim : null,
           usuarioId: "550e8400-e29b-41d4-a716-446655440010",
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
                              setItem(e.target.value);
                              setItemSelecionado({ id: e.target.value, nome: e.target.value });
                          }}
                           options={itens}
                           widthPx={300}
                       />


                       <Input
                           label="Data"
                           type="datetime-local"
                           value={data}
                           onChange={(e: any) => setData(e.target.value)}
                           icon={<FiCalendar size={18} />}
                           widthPx={300}
                       />
                   </div>


                   <div className="flex flex-col gap-8">



                       <Input
                           label="Hora Início"
                           type="datetime-local"
                           value={horaInicio}
                           onChange={(e: any) => setHoraInicio(e.target.value)}
                           icon={<FiClock size={18} />}
                           widthPx={300}
                       />


                       <Input
                           label="Hora Fim"
                           type="datetime-local"
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
                               type="datetime-local"
                               value={pausaInicio}
                               onChange={(e: any) => setPausaInicio(e.target.value)}
                               widthPx={300}
                           />


                           <Input
                               label="Fim Pausa"
                               type="datetime-local"
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

