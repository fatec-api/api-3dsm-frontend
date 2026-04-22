import { useState, useEffect } from "react";
import { X } from 'lucide-react';
import Botao from '../shared/components/Botao';

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

    const opcoesProjetos = ["GSWProj1", "GSWProj2", "GSWProj3", "GSWProj4"];
    useEffect(() => {
        if (isOpen && apontamento) {
            setFormData(apontamento);
        }
    }, [isOpen, apontamento]);

    if (!isOpen || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } : null);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[999]">
            <div className="bg-white rounded-[2.5rem] p-10 relative shadow-2xl w-full max-w-2xl mx-4 border border-gray-100 max-h-[90vh] overflow-y-auto">
                
                <button onClick={onClose} className="absolute right-8 top-8 text-gray-400 hover:text-black transition-colors p-2">
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-semibold text-center text-[#2D3748] mb-10">
                    Atualizar o Apontamento
                </h2>

                <div className="grid grid-cols-1 gap-6">
                    {}
                    <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black transition-all">
                        <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Projeto</label>
                        <select 
                            name="projeto"
                            value={formData.projeto}
                            onChange={handleChange}
                            className="w-full p-2 outline-none bg-transparent cursor-pointer"
                        >
                            {}
                            {opcoesProjetos.map(proj => (
                                <option key={proj} value={proj}>{proj}</option>
                            ))}
                            
                            {}
                            {!opcoesProjetos.includes(formData.projeto) && (
                                <option value={formData.projeto}>{formData.projeto}</option>
                            )}
                        </select>
                    </div>

                    {}
                    <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black transition-all">
                        <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Item</label>
                        <input 
                            name="item"
                            value={formData.item}
                            onChange={handleChange}
                            className="w-full p-2 outline-none"
                        />
                    </div>

                    {}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Data</label>
                            <input type="date" name="data" value={formData.data} onChange={handleChange} className="w-full p-2 outline-none" />
                        </div>
                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Início</label>
                            <input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleChange} className="w-full p-2 outline-none" />
                        </div>
                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Fim</label>
                            <input type="time" name="horaFim" value={formData.horaFim} onChange={handleChange} className="w-full p-2 outline-none" />
                        </div>
                    </div>

                    {}
                    <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black">
                        <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Observação</label>
                        <textarea 
                            name="observacao"
                            value={formData.observacao}
                            onChange={handleChange}
                            className="w-full p-2 min-h-[100px] outline-none resize-none"
                        />
                    </div>

                    <div className="flex justify-center mt-4">
                        <Botao 
                            onClick={() => onSave(formData)}
                            disabled={isLoading}
                            className="w-full max-w-xs !h-14 !text-xl font-bold flex items-center justify-center"
                        >
                            {isLoading ? <span className="loading loading-spinner"></span> : 'Apontar'}
                        </Botao>
                    </div>
                </div>
            </div>
        </div>
    );
}