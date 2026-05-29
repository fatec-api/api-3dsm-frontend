import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import { useParams } from "react-router-dom";
import { listarApontamentosUsuarios } from "../services/apontamentoService";
import { listarItensPorProfissional } from "../services/ItemService";
import { FaPencilAlt } from "react-icons/fa";
import ModalEditarApontamento from "../components/ModalEditarApontamento";
import { listarProjetos } from "../services/projectService";

type Log = {
	id: number;
	projeto: string;
	atividade: string;
	nivel: string;
	data: string;
	inicio: string;
	fim: string;
	status: "PENDENTE" | "APROVADO" | "REPROVADO";
	observacao?: string;
	justificativa?: string;
};

export default function TelaLogProfissional() {
	const [logs, setLogs] = useState<Log[]>([]);
	const [loading, setLoading] = useState(true);
	const [erro, setErro] = useState<string | null>(null);
	const [sucesso, setSucesso] = useState<string | null>(null);
	const { id } = useParams<{ id: string }>();
	const [paginaAtual, setPaginaAtual] = useState(1);
	const [observacaoSelecionada, setObservacaoSelecionada] = useState<string | null>(null);
	const [justificativaSelecionada, setJustificativaSelecionada] = useState<string | null>(null);
	const itensPorPagina = 15;
	const [logSelecionado, setLogSelecionado] = useState<Log | null>(null);
	const [modalAberto, setModalAberto] = useState(false);

	const fetchLogs = async () => {
		if (!id) return;

		try {
			setLoading(true);
			setErro(null);

			const [apontamentos, respostaProjetos, respostaItens] = await Promise.all([
				listarApontamentosUsuarios(id),
				listarProjetos(),
				listarItensPorProfissional(id)
			]);

			const projetos = Array.isArray(respostaProjetos)
				? respostaProjetos
				: (respostaProjetos?.data || []);

			const itens = Array.isArray(respostaItens)
				? respostaItens
				: (respostaItens?.data || []);

			const logsCompletos: Log[] = apontamentos.map((a: any) => {
				const item = itens.find((i: any) => String(i.id) === String(a.itemId));
				const idProjetoAlvo = item?.id_projeto || item?.projetoId || item?.projeto?.id;

				const projetoEncontrado = projetos.find(
					(p: any) => String(p.id) === String(idProjetoAlvo)
				);

				return {
					id: a.id,
					projeto:
						projetoEncontrado?.nomeProjeto ||
						projetoEncontrado?.nome_projeto ||
						projetoEncontrado?.projeto?.nomeProjeto ||
						"Sem projeto",
					atividade: a.itemDescricao || item?.descricao || "Sem atividade",
					nivel: item?.nivelAtividade || a.nivel || "UNDEFINED",
					data: a.dataApontamento || a.data || "",
					inicio: a.horaInicio || a.inicio || "",
					fim: a.horaFim || a.fim || "",
					status: a.status_apontamento || a.status || "PENDENTE",
					observacao: a.observacao || "-",
					justificativa: a.justificativaReprovacao || "-",
				};
			});

			const logsOrdenados = logsCompletos.sort(
				(a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
			);

			setLogs(logsOrdenados);
		} catch (error) {
			console.error("Erro na requisição:", error);
			setErro("Não foi possível carregar seus apontamentos no momento.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchLogs();
	}, [id]);
	const handleEditar = (id: number) => {
		const log = logs.find(l => l.id === id);
		if (!log) return;
		setLogSelecionado(log);
		setModalAberto(true);
	};

	// paginação
	const inicio = (paginaAtual - 1) * itensPorPagina;
	const fim = inicio + itensPorPagina;
	const logsPaginamento = logs.slice(inicio, fim);
	const totalPaginas = Math.ceil(logs.length / itensPorPagina);
	const observacaoLimpa = (text?: string) => {
		if (!text) return null;
		const t = text.trim();
		if (t === "-" || t === "--") return null;
		return t;
	};
	const justificativaLimpa = (text?: string) => {
		if (!text) return null;
		const t = text.trim();
		if (t === "-" || t === "--") return null;
		return t;
	};
	return (
		<div className="min-h-screen">
			<Header />
			<div className="flex justify-center my-10 px-6">
				<div className="w-full max-w-7xl bg-base-200 rounded-2xl p-8 shadow-md">
					<h1 className="text-center text-2xl font-semibold mb-8">
						Meus Últimos Apontamentos
					</h1>
					{loading ? (
						<div className="flex justify-center py-12">
							<span className="loading loading-spinner loading-lg"></span>
						</div>
					) : (
						<div className="overflow-x-auto rounded-xl">
							<table className="table table-zebra">
								<thead>
									<tr>
										<th>Projeto</th>
										<th>Atividade</th>
										<th>Nível</th>
										<th>Data</th>
										<th>Início</th>
										<th>Fim</th>
										<th>Status</th>
										<th>Observação</th>
										<th>Justificativa</th>
										<th className="text-center">Editar</th>
									</tr>
								</thead>
								<tbody>
									{logsPaginamento.map((row) => {
										const isEditavel = row.status === "PENDENTE";
										const badgeColor =
											row.status === "PENDENTE"
												? "badge-warning"
												: row.status === "APROVADO"
													? "badge-success"
													: "badge-error";
										return (
											< tr key={row.id} className="hover" >
												<td>{row.projeto}</td>
												<td>{row.atividade}</td>
												<td>{row.nivel}</td>
												<td>{row.data}</td>
												<td>{row.inicio}</td>
												<td>{row.fim}</td>
												<td>
													<span className={`badge ${badgeColor}`}>
														{row.status}
													</span>
												</td>
												<td className="align-middle">
													{(() => {
														const texto = observacaoLimpa(row.observacao);
														if (!texto) return <span className="text-gray-400">-</span>;

														return (
															<span
																className="cursor-pointer underline block"
																onClick={() => setObservacaoSelecionada(texto)}
															>
																{texto.length > 20 ? texto.slice(0, 20) + "..." : texto}
															</span>
														);
													})()}
												</td>
												<td className="align-middle">
													{(() => {
														const texto = justificativaLimpa(row.justificativa);
														if (!texto) return <span className="text-gray-400">-</span>;

														return (
															<span
																className="cursor-pointer underline block"
																onClick={() => setJustificativaSelecionada(texto)}
															>
																{texto.length > 20 ? texto.slice(0, 20) + "..." : texto}
															</span>
														);
													})()}
												</td>
												<td className="text-center">
													<div className="tooltip" data-tip={
														isEditavel
															? "Editar apontamento"
															: "Este apontamento já foi revisado e não pode mais ser editado"
													}>
														<button
															className={`btn btn-sm btn-circle ${isEditavel
																? "btn-ghost hover:bg-base-300"
																: "btn-disabled"
																}`}
															onClick={() => handleEditar(row.id)}
															disabled={!isEditavel}
														>
															<FaPencilAlt size={14} className="text-[#0D1B2A]" />
														</button>
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							{logs.length === 0 && !erro && (
								<div className="alert text-center py-6 justify-center text-gray-500">
									Nenhum apontamento encontrado
								</div>
							)}
						</div>
					)}
					{erro && (
						<div className="alert alert-error alert-soft flex items-center justify-around mt-6">
							{erro}
						</div>
					)}
					{sucesso && (
						<div className="alert alert-success mt-6">
							<span>{sucesso}</span>
						</div>
					)}
					{observacaoSelecionada && (
                        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-gray-100 p-6 rounded-lg max-w-md w-full shadow-lg">
                                <h2 className="text-lg font-semibold mb-4">Observação</h2>
                                <p className="mb-4 break-words">{observacaoSelecionada}</p>
                                <div className="flex justify-end">
                                    <button
                                        className="btn btn-sm"
                                        onClick={() => setObservacaoSelecionada(null)}
                                    >
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
					{justificativaSelecionada && (
                        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-gray-100 p-6 rounded-lg max-w-md w-full shadow-lg">
                                <h2 className="text-lg font-semibold mb-4">Justificativa da Reprovação</h2>
                                <p className="mb-4 break-words">{justificativaSelecionada}</p>
                                <div className="flex justify-end">
                                    <button
                                        className="btn btn-sm"
                                        onClick={() => setJustificativaSelecionada(null)}
                                    >
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
					{modalAberto && logSelecionado && (
						<ModalEditarApontamento
							isOpen={modalAberto}
							onClose={() => {
								setModalAberto(false);
								fetchLogs();
							}}
							apontamento={logSelecionado}
							onSave={(apontamentoAtualizado: Log) => {
								setLogs((prev) =>
									prev.map((l) =>
										l.id === apontamentoAtualizado.id ? apontamentoAtualizado : l
									)
								);
								setSucesso("Apontamento atualizado com sucesso!");
								setModalAberto(false);
								fetchLogs();
							}}
						/>
					)}
					<div className="flex justify-center mt-8">
						<div className="join shadow-sm">
							<button
								className="join-item btn btn-sm"
								onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}
							>
								«
							</button>
							<button className="join-item btn btn-sm btn-active">
								Página {paginaAtual}
							</button>
							<button
								className="join-item btn btn-sm"
								onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}
							>
								»
							</button>
						</div>
					</div>

				</div>
			</div>
		</div >
	);
}