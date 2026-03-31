import Input from "../shared/components/Input";
import Dropdown from "../shared/components/Dropdown";
import Botao from "../shared/components/Botao";

export default function FormularioApontamento() {
  return (
    <form className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-[700px] flex flex-col gap-10">
      
      <h1 className="text-2xl font-semibold text-center">
        Apontamento de Horas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Dropdown label="Projeto" options={[]} />
        <Dropdown label="Item" options={[]} />
      </div>

      <Dropdown
        label="Nível da Atividade"
        options={["Análise", "Desenvolvimento", "Teste"]}
      />

      <Input label="Data" type="date" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input label="Hora Início" type="time" />
        <Input label="Hora Fim" type="time" />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium">Pausa (opcional)</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input label="Início da Pausa" type="time" />
          <Input label="Fim da Pausa" type="time" />
        </div>
      </div>

      <div className="flex justify-center">
        <Botao type="submit">Apontar</Botao>
      </div>

    </form>
  );
}