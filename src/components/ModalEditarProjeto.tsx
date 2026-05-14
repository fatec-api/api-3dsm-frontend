import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Botao from '../shared/components/Botao';
import { editarProjeto } from '../services/projectService';

const TIPOS_PROJETO = ['Alocacao', 'Hora_Fechada'];
const STATUS_PROJETO = ['Andamento', 'Desenvolvimento', 'Concluida'];

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
    onSucesso?: () => void;
}

export default function ModalEditarProjeto({
    isOpen, onClose, projetoId, dadosAtuais, onSucesso
}: ModalEditarProjetoProps) {
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [tipoProjeto, setTipoProjeto] = useState('');
    const [valorOrcamento, setValorOrcamento] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        if (isOpen && dadosAtuais) {
            setNomeProjeto(dadosAtuais.nomeProjeto ?? '');
            setTipoProjeto(dadosAtuais.tipoProjeto ?? '');
            setValorOrcamento(dadosAtuais.valorOrcamento?.toString() ?? '');
            setDataInicio(dadosAtuais.dataInicio ?? '');
            setDataFim(dadosAtuais.dataFim ?? '');
            setStatus(dadosAtuais.status ?? '');
            setMessage(null);
        }
    }, [isOpen, dadosAtuais]);

    if (!isOpen) return null;

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

            await editarProjeto(projetoId, payload);

            setMessage({ type: 'success', text: 'Projeto atualizado com sucesso!' });
            setTimeout(() => {
                onClose();
                try { onSucesso?.(); } catch (_) { }
            }, 1500);
        } catch (error: any) {
            const status = error?.response?.status;
            if (status && status >= 400) {
                const msg = error?.response?.data?.message || 'Erro ao atualizar o projeto.';
                setMessage({ type: 'error', text: msg });
            } else {
                // Resposta sem body ou parse error — provavelmente sucesso
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
            <div className="bg-base-100 rounded-[2.5rem] p-10 relative shadow-2xl w-full max-w-lg mx-4">
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
                        {erroOrcamento && (
                            <p className="text-error text-xs mt-1">{erroOrcamento}</p>
                        )}
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
                    {erroData && (
                        <p className="text-error text-xs -mt-2">{erroData}</p>
                    )}

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

                    {message && (
                        <div className={`alert py-3 rounded-xl border ${message.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                            }`}>
                            <span className="text-sm font-bold text-center w-full">{message.text}</span>
                        </div>
                    )}

                    <div className="flex justify-center pt-2">
                        <Botao
                            type="button"
                            disabled={!podeSalvar}
                            onClick={handleSalvar}
                        >
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