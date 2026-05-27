import Header from "../shared/components/Header";
import FormCadastroProjeto from "../components/FormCadastroProjeto";

export default function CadastroProjeto() {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Header />
      <div className="flex-1 flex items-center justify-center my-10">
        <FormCadastroProjeto />
      </div>
    </div>
  );
}