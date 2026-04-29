import { useState, useEffect, useCallback } from "react";
import { X, AlertCircle } from 'lucide-react';
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
                .catch(() => {
                    setProjetos([
                        { id: 1, nome: "GSWProj1" },
                        { id: 2, nome: "GSWProj2" },
                        { id: 3, nome: "GSWProj3" },
                        { id: 4, nome: "GSWProj4" }
                    ]);
                })
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
                "GSWProj3": ["Análise de Requisitos", "Suporte ao Cliente", "Criação de testes unitários", "Desenvolvimento de funcionalidade X", "Correção de bug crítico em produção"],
                "GSWProj4": ["Documentação Técnica", "Modelagem de Dados", "Refatoração de código legado"],
                "GSWProj5": ["Reunião de alinhamento técnico", "Revisão de Pull Request"],
                "GSWProj6": ["Implementação de API Rest", "Ajustes de UI/UX no frontend"]
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
            alert("Não é permitido usar datas futuras.");
            return;
        }

        if (formData.horaFim <= formData.horaInicio) {
            alert("Hora final deve ser maior que a inicial.");
            return;
        }

        onSave(formData);
    }, [formData, onSave]);

    if (!isOpen || !formData) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[999]">
            <div className="bg-white rounded-[2.5rem] p-10 relative shadow-2xl w-full max-w-2xl mx-4 max-h-[95vh] overflow-y-auto text-black border border-gray-100">

                <button 
                    onClick={onClose} 
                    className="absolute right-8 top-8 text-gray-400 hover:text-red-500 p-2 transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-3xl text-center mb-10 font-semibold text-[#2D3748]">
                    Atualizar Apontamento
                </h2>

                <div className="space-y-7">

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black transition-all">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Projeto</label>
                            <select 
                                name="projeto" 
                                value={formData.projeto} 
                                onChange={handleChange} 
                                className="w-full p-2 outline-none bg-transparent cursor-pointer disabled:opacity-50"
                                disabled={loadingProjetos}
                            >
                                {projetos.map(p => (
                                    <option key={p.id} value={p.nomeProjeto || p.nome}>{p.nomeProjeto || p.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black transition-all">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Atividade</label>
                            <select 
                                name="item" 
                                value={formData.item} 
                                onChange={handleChange} 
                                className="w-full p-2 outline-none bg-transparent cursor-pointer"
                            >
                                {itensDisponiveis.map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Data</label>
                            <input type="date" name="data" value={formData.data} onChange={handleChange} className="w-full p-2 outline-none bg-transparent" />
                        </div>
                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Início</label>
                            <input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleChange} className="w-full p-2 outline-none bg-transparent" />
                        </div>
                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Fim</label>
                            <input type="time" name="horaFim" value={formData.horaFim} onChange={handleChange} className="w-full p-2 outline-none bg-transparent" />
                        </div>
                    </div>

                    <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black">
                        <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Observação</label>
                        <textarea
                            name="observacao"
                            value={formData.observacao}
                            onChange={handleChange}
                            className="w-full p-2 min-h-[100px] outline-none resize-none bg-transparent"
                        />
                    </div>

                    {apontamento?.observacao && (
                        <div className="flex gap-2 text-amber-600 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span className="text-sm"><b>Motivo da reprovação:</b> {apontamento.observacao}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="w-full h-14 rounded-2xl border-2 border-gray-200 text-gray-500 font-bold text-lg hover:bg-gray-50 transition-all"
                        >
                            Cancelar
                        </button>

                        <button 
                            type="button"
                            onClick={handleValidarESalvar}
                            disabled={isLoading}
                            className="w-full h-14 rounded-2xl bg-black text-white font-bold text-lg hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Salvando...
                                </>
                            ) : "Salvar Alterações"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}