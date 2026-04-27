import { useState, useEffect, useCallback } from "react";
import { X, AlertCircle } from 'lucide-react';
import Botao from '../shared/components/Botao';
import { listarProjetos } from "../services/projectService";

interface Apontamento {
    id: string;
    projeto: string;
    item: string;
    data: string;
    horaInicio: string;
    horaFim: string;
    observacao: string;
}

interface ModalEditarApontamentoProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (dadosAtualizados: Apontamento) => void;
    apontamento: Apontamento | null;
    isLoading?: boolean;
}

export default function ModalEditarApontamento({
    isOpen,
    onClose,
    onSave,
    apontamento,
    isLoading = false
}: ModalEditarApontamentoProps) {
    const [formData, setFormData] = useState<Apontamento | null>(null);
    const [projetos, setProjetos] = useState<any[]>([]);
    const [itensDisponiveis, setItensDisponiveis] = useState<string[]>([]);
    const [loadingProjetos, setLoadingProjetos] = useState(false);
    const formatarDataParaInput = (dataRaw: string) => {
        if (!dataRaw) return "";
        if (dataRaw.includes('/')) {
            const [dia, mes, ano] = dataRaw.split('/');
            return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
        }
        return dataRaw.split('T')[0];
    };
    useEffect(() => {
        if (isOpen) {
            setLoadingProjetos(true);
            listarProjetos()
                .then(setProjetos)
                .catch(() => console.error("Falha ao carregar lista de projetos"))
                .finally(() => setLoadingProjetos(false));
        }

        if (isOpen && apontamento) {
            setFormData({
                ...apontamento,
                data: formatarDataParaInput(apontamento.data)
            });
        }
    }, [isOpen, apontamento]);
    useEffect(() => {
        if (formData?.projeto) {
            const mockBancoDeDadosItens: Record<string, string[]> = {
                "GSWProj1": ["Desenvolvimento API", "Refatoração Clean Code", "Daily Scrum"],
                "GSWProj2": ["Correção de Bugs", "Deploy Homologação", "Testes Unitários"],
                "Projeto A": ["Análise de Requisitos", "Suporte ao Cliente"],
                "Projeto B": ["Documentação Técnica", "Modelagem de Dados"]
            };
            setItensDisponiveis(mockBancoDeDadosItens[formData.projeto] || ["Atividade Geral"]);
        }
    }, [formData?.projeto]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleValidarESalvar = useCallback(() => {
        if (!formData) return;

        const hoje = new Date().toISOString().split('T')[0];
        if (formData.data > hoje) {
            alert("⚠️ Erro: Não é permitido apontar horas em datas futuras.");
            return;
        }

        if (formData.horaFim <= formData.horaInicio) {
            alert("⚠️ Erro: A hora de término deve ser posterior ao início.");
            return;
        }

        if (!formData.item || !formData.projeto) {
            alert("⚠️ Erro: Projeto e Atividade são obrigatórios.");
            return;
        }

        onSave(formData);
    }, [formData, onSave]);

    if (!isOpen || !formData) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[999]" role="dialog" aria-modal="true">
            <div className="bg-white rounded-[2.5rem] p-10 relative shadow-2xl w-full max-w-2xl mx-4 border border-gray-100 max-h-[95vh] overflow-y-auto">
                
                {}
                <button 
                    onClick={onClose} 
                    className="absolute right-8 top-8 text-gray-400 hover:text-red-500 transition-all p-2"
                    aria-label="Fechar modal"
                >
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-semibold text-center text-[#2D3748] mb-8">
                    Atualizar Apontamento
                </h2>

                <div className="space-y-6">
                    {}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black transition-all">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Projeto</label>
                            <select 
                                name="projeto"
                                value={formData.projeto}
                                onChange={handleChange}
                                disabled={loadingProjetos}
                                className="w-full p-2 outline-none bg-transparent cursor-pointer disabled:opacity-50"
                            >
                                {projetos.map(p => (
                                    <option key={p.id} value={p.nomeProjeto || p.nome}>{p.nomeProjeto || p.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black transition-all">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Item / Atividade</label>
                            <select 
                                name="item"
                                value={formData.item}
                                onChange={handleChange}
                                className="w-full p-2 outline-none bg-transparent cursor-pointer"
                            >
                                <option value="">Selecione a atividade</option>
                                {itensDisponiveis.map((item, idx) => (
                                    <option key={idx} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Data</label>
                            <input 
                                type="date" 
                                name="data" 
                                value={formData.data} 
                                onChange={handleChange} 
                                className="w-full p-2 outline-none" 
                            />
                        </div>
                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Hora Início</label>
                            <input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleChange} className="w-full p-2 outline-none" />
                        </div>
                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Hora Fim</label>
                            <input type="time" name="horaFim" value={formData.horaFim} onChange={handleChange} className="w-full p-2 outline-none" />
                        </div>
                    </div>

                    {}
                    <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black">
                        <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Justificativa / Observação</label>
                        <textarea 
                            name="observacao"
                            value={formData.observacao}
                            onChange={handleChange}
                            placeholder="Descreva o que foi realizado..."
                            className="w-full p-2 min-h-[100px] outline-none resize-none"
                        />
                    </div>

                    {}
                    {apontamento?.observacao && (
                        <div className="flex items-start gap-2 text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-100">
                            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                            <p className="text-sm"><b>Motivo da última reprovação:</b> {apontamento.observacao}</p>
                        </div>
                    )}

                    {/* Ações: Salvar e Cancelar */}
                    <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
                        <button 
                            type="button"
                            onClick={onClose} 
                            className="w-full max-w-xs h-14 rounded-xl border-2 border-gray-200 text-gray-500 font-bold text-lg hover:bg-gray-50 hover:text-black transition-all order-2 md:order-1"
                        >
                            Cancelar
                        </button>
                        <Botao 
                            onClick={handleValidarESalvar}
                            disabled={isLoading}
                            className="w-full max-w-xs !h-14 !text-xl font-bold flex items-center justify-center order-1 md:order-2"
                        >
                            {isLoading ? <span className="loading loading-spinner"></span> : 'Salvar Alterações'}
                        </Botao>
                    </div>
                </div>
            </div>
        </div>
    );
}