import { useState } from "react";
import Input from "../shared/components/Input";
import Dropdown from "../shared/components/Dropdown";
import Botao from "../shared/components/Botao";

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

  const projetos = ["Projeto A", "Projeto B"];

  const itensPorProjeto: any = {
    "Projeto A": ["Item 1", "Item 2"],
    "Projeto B": ["Item 3"],
  };

  const itens = projeto ? itensPorProjeto[projeto] || [] : [];

  return (
    <form className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-[700px] flex flex-col gap-10">
      
      <h1 className="text-2xl font-semibold text-center">
        Apontamento de Horas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Dropdown
          label="Projeto"
          value={projeto}
          onChange={(e: any) => setProjeto(e.target.value)}
          options={projetos}
        />

        <Dropdown
          label="Item"
          value={item}
          onChange={(e: any) => setItem(e.target.value)}
          options={itens}
        />
      </div>

      <Dropdown
        label="Nível da Atividade"
        value={nivel}
        onChange={(e: any) => setNivel(e.target.value)}
        options={["Análise", "Desenvolvimento", "Teste"]}
      />

      <Input
        label="Data"
        type="date"
        value={data}
        onChange={(e: any) => setData(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input
          label="Hora Início"
          type="time"
          value={horaInicio}
          onChange={(e: any) => setHoraInicio(e.target.value)}
        />

        <Input
          label="Hora Fim"
          type="time"
          value={horaFim}
          onChange={(e: any) => setHoraFim(e.target.value)}
        />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              label="Início da Pausa"
              type="time"
              value={pausaInicio}
              onChange={(e: any) => setPausaInicio(e.target.value)}
            />

            <Input
              label="Fim da Pausa"
              type="time"
              value={pausaFim}
              onChange={(e: any) => setPausaFim(e.target.value)}
            />
          </div>
        )}

      </div>

      <div className="flex justify-center">
        <Botao type="submit">Apontar</Botao>
      </div>

    </form>
  );
}