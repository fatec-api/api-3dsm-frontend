import { useState, useEffect } from 'react';
import { X, Search, Users, CheckCircle2 } from 'lucide-react';
import Botao from '../shared/components/Botao';
import { editarProjeto } from '../services/projectService';
import instance from '../api/instance';

const TIPOS_PROJETO = ['Alocacao', 'Hora_Fechada'];
const STATUS_PROJETO = ['Andamento', 'Desenvolvimento', 'Concluida'];

interface Profissional {
    id: string;
    nomeUsuario: string;
    email: string;
}

interface ModalEditarProjetoProps {
    isOpen: boolean;
    onClose: () => void;
    projetoId: number;
    dadosAtuais?: {
        nomeProjeto?: string;
        tipoProjeto?: string;
        valorOrcamento?: number;
        dataInicio?: string;
        dataFim?: string;
        status?: string;
    };
    todosProfissionais: Profissional[]; // lista geral vinda do pai
    onSucesso?: () => void;
}

export default function ModalEditarProjeto({
    isOpen, onClose, projetoId, dadosAtuais, todosProfissionais, onSucesso
}: ModalEditarProjetoProps) {
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [tipoProjeto, setTipoProjeto] = useState('');
    const [valorOrcamento, setValorOrcamento] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [status, setStatus] = useState('');

    const [selectedProfissionais, setSelectedProfissionais] = useState<Profissional[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAlocados, setIsLoadingAlocados] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Preenche campos e carrega profissionais já alocados ao abrir
    useEffect(() => {
        if (!isOpen) return;

        if (dadosAtuais) {
            setNomeProjeto(dadosAtuais.nomeProjeto ?? '');
            setTipoProjeto(dadosAtuais.tipoProjeto ?? '');
            setValorOrcamento(dadosAtuais.valorOrcamento?.toString() ?? '');
            setDataInicio(dadosAtuais.dataInicio ?? '');
            setDataFim(dadosAtuais.dataFim ?? '');
            setStatus(dadosAtuais.status ?? '');
            setMessage(null);
        }

        const carregarAlocados = async () => {
            try {
                setIsLoadingAlocados(true);
                const res = await instance.get(`/gestao/alocacoes/projeto/${projetoId}`);
                setSelectedProfissionais(res.data ?? []);
            } catch (error) {
                console.error('Erro ao carregar profissionais alocados:', error);
            } finally {
                setIsLoadingAlocados(false);
            }
        };

        carregarAlocados();
    }, [isOpen, dadosAtuais, projetoId]);

    if (!isOpen) return null;

    // Profissionais disponíveis para adicionar (filtrados pela busca e sem os já selecionados)
    const profissionaisDisponiveis = todosProfissionais.filter(p =>
        (p.nomeUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !selectedProfissionais.some(s => s.id === p.id)
    );

    const handleSelectProfissional = (p: Profissional) => {
        setSelectedProfissionais(prev => [...prev, p]);
        setSearchTerm('');
    };

    const handleRemoveProfissional = (id: string) => {
        setSelectedProfissionais(prev => prev.filter(p => p.id !== id));
    };

    // Validações
    const erroOrcamento =
        valorOrcamento !== '' && parseFloat(valorOrcamento) < 0
            ? 'O orçamento não pode ser negativo.'
            : null;

    const erroData =
        dataInicio && dataFim && dataFim < dataInicio
            ? 'A data fim não pode ser anterior à data início.'
            : null;

    const podeSalvar = !isLoading && !erroOrcamento && !erroData;

    const handleSalvar = async () => {
        if (!podeSalvar) return;

        try {
            setIsLoading(true);
            setMessage(null);

            const payload: Record<string, any> = {};
            if (nomeProjeto) payload.nomeProjeto = nomeProjeto;
            if (tipoProjeto) payload.tipoProjeto = tipoProjeto;
            if (valorOrcamento) payload.valorOrcamento = parseFloat(valorOrcamento);
            if (dataInicio) payload.dataInicio = dataInicio;
            if (dataFim) payload.dataFim = dataFim;
            if (status) payload.status = status;

            // Sempre envia a lista de profissionais (substitui a lista atual)
            payload.profissionalAlocadoIds = selectedProfissionais.map(p => p.id);

            await editarProjeto(projetoId, payload);

            setMessage({ type: 'success', text: 'Projeto atualizado com sucesso!' });
            setTimeout(() => {
                onClose();
                try { onSucesso?.(); } catch (_) { }
            }, 1500);
        } catch (error: any) {
            const httpStatus = error?.response?.status;
            if (httpStatus && httpStatus >= 400) {
                setMessage({ type: 'error', text: error?.response?.data?.message || 'Erro ao atualizar o projeto.' });
            } else {
                setMessage({ type: 'success', text: 'Projeto atualizado com sucesso!' });
                setTimeout(() => {
                    onClose();
                    try { onSucesso?.(); } catch (_) { }
                }, 1500);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[999]">
            <div className="bg-base-100 rounded-[2.5rem] p-10 relative shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute right-8 top-8 text-base-content/40 hover:text-base-content transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-center text-base-content mb-8">
                    Editar Projeto
                </h2>

                <div className="space-y-4">

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-base-content/70">Nome do Projeto</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Ex: GSW1234"
                            value={nomeProjeto}
                            onChange={(e) => setNomeProjeto(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-base-content/70">Tipo do Projeto</label>
                        <select
                            className="select select-bordered w-full"
                            value={tipoProjeto}
                            onChange={(e) => setTipoProjeto(e.target.value)}
                        >
                            <option value="">Selecione...</option>
                            {TIPOS_PROJETO.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-base-content/70">Valor do Orçamento</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            className={`input input-bordered w-full ${erroOrcamento ? 'input-error' : ''}`}
                            placeholder="0,00"
                            value={valorOrcamento}
                            onChange={(e) => setValorOrcamento(e.target.value)}
                        />
                        {erroOrcamento && <p className="text-error text-xs mt-1">{erroOrcamento}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-base-content/70">Data Início</label>
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-base-content/70">Data Fim</label>
                            <input
                                type="date"
                                className={`input input-bordered w-full ${erroData ? 'input-error' : ''}`}
                                value={dataFim}
                                onChange={(e) => setDataFim(e.target.value)}
                            />
                        </div>
                    </div>
                    {erroData && <p className="text-error text-xs -mt-2">{erroData}</p>}

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-base-content/70">Status</label>
                        <select
                            className="select select-bordered w-full"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Selecione...</option>
                            {STATUS_PROJETO.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    {/* Seção de profissionais */}
                    <div className="divider text-xs text-base-content/40 uppercase">Profissionais Alocados</div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-base-content/70">Adicionar profissional</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 z-10" size={18} />
                            <input
                                className="input input-bordered w-full pl-11"
                                placeholder="Filtrar por nome ou e-mail..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Lista sempre visível, filtrável */}
                        <ul className="w-full bg-base-200 border border-base-content/10 rounded-xl max-h-40 overflow-auto p-2">
                            {profissionaisDisponiveis.length > 0 ? (
                                profissionaisDisponiveis.map(p => (
                                    <li
                                        key={p.id}
                                        onClick={() => handleSelectProfissional(p)}
                                        className="p-3 hover:bg-base-100 rounded-lg cursor-pointer flex justify-between text-base-content"
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">{p.nomeUsuario}</span>
                                            <span className="text-xs text-base-content/50">{p.email}</span>
                                        </div>
                                        <CheckCircle2 size={18} className="text-base-content/20" />
                                    </li>
                                ))
                            ) : (
                                <li className="text-sm text-base-content/50 text-center p-3">
                                    {isLoadingAlocados ? 'Carregando...' : 'Nenhum profissional disponível.'}
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="p-4 bg-base-200 rounded-xl border border-dashed border-base-content/20 min-h-[72px]">
                        <p className="text-xs font-black text-base-content/40 mb-2 flex items-center gap-2 uppercase">
                            {isLoadingAlocados
                                ? <span className="loading loading-spinner loading-xs" />
                                : <Users size={14} />
                            }
                            Selecionados ({selectedProfissionais.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {selectedProfissionais.map(p => (
                                <div
                                    key={p.id}
                                    className="bg-base-100 border border-base-content/10 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm text-base-content shadow-sm"
                                >
                                    <span className="font-medium">{p.nomeUsuario}</span>
                                    <X
                                        size={14}
                                        className="cursor-pointer text-red-400 hover:text-red-600"
                                        onClick={() => handleRemoveProfissional(p.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {message && (
                        <div className={`alert py-3 rounded-xl border ${message.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                            }`}>
                            <span className="text-sm font-bold text-center w-full">{message.text}</span>
                        </div>
                    )}

                    <div className="flex justify-center pt-2">
                        <Botao type="button" disabled={!podeSalvar} onClick={handleSalvar}>
                            {isLoading
                                ? <span className="loading loading-spinner loading-sm"></span>
                                : 'Salvar alterações'}
                        </Botao>
                    </div>

                </div>
            </div>
        </div>
    );
}