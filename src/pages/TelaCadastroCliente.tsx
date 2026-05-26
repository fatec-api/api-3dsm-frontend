import FormCadastroCliente from "../components/FormCadastroCliente";
import Header from "../shared/components/Header";

export default function TelaCadastroCliente() {
	return (
		<div className="min-h-screen flex flex-col dark:bg-gray-900">
			<Header />
			<div className="flex-1 flex items-center justify-center px-4">
				<FormCadastroCliente />
			</div>
		</div>
	);
}