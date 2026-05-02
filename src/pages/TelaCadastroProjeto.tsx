import Header from "../shared/components/Header";
import FormCadastroProjeto from "../components/FormCadastroProjeto";

export default function CadastroProjeto() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <FormCadastroProjeto />
      </div>
    </div>
  );
}