import Header from "../shared/components/Header";
import FormCadastroItem from "../components/FormCadastroItem";

export default function CadastroItem() {
	return (
		<div className="min-h-screen flex flex-col dark:bg-gray-900">
			<Header />
			<div className="flex-1 flex items-center justify-center px-4 py-8">
				<FormCadastroItem />
			</div>
		</div>
	);
}