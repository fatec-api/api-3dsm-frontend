import { useState, useEffect, useCallback } from "react";
import { X } from 'lucide-react';
import { listarProjetos } from "../services/projectService";
import { buscarApontamentoPorId, atualizarApontamentoPatch } from "../services/apontamentoService";
import { listarItens } from "../services/ItemService";

interface Apontamento {
    id: string;
    projeto: string;
    item: string;
    data: string;
    horaInicio: string;
    horaFim: string;
    observacao: string;
}

export default function ModalEditarApontamento({
    isOpen,
    onClose,
    onSave,
    apontamento,
    isLoading = false
}: any) {

    const [formData, setFormData] = useState<Apontamento | null>(null);
    const [projetos, setProjetos] = useState<any[]>([]);
    const [itensDisponiveis, setItensDisponiveis] = useState<any[]>([]);
    const [loadingProjetos, setLoadingProjetos] = useState(false);

    const [itemId, setItemId] = useState<number | null>(null);
    const [usuarioId, setUsuarioId] = useState<string>("");

    const [projetoId, setProjetoId] = useState<number | null>(null);

    function parseDataBR(dataStr: string) {
        if (!dataStr) return "";
        const [data] = dataStr.split(" ");
        const [dia, mes, ano] = data.split("/");
        return `${ano}-${mes}-${dia}`;
    }

    function parseHoraBR(dataStr: string) {
        if (!dataStr) return "";
        const [, hora] = dataStr.split(" ");
        return hora?.substring(0, 5);
    }

    function formatarDataApontamento(dateStr: string) {
        if (!dateStr) return null;
        return `${dateStr}T00:00:00`;
    }

    function formatarDataHora(data: string, hora: string) {
        if (!data || !hora) return null;
        return `${data}T${hora}:00`;
    }

    useEffect(() => {
        if (!isOpen) return;

        setLoadingProjetos(true);
        listarProjetos()
            .then(setProjetos)
            .finally(() => setLoadingProjetos(false));
    }, [isOpen]);
    useEffect(() => {
        if (!isOpen || !apontamento?.id || projetos.length === 0) return;

        buscarApontamentoPorId(apontamento.id)
            .then((resp) => {

                setItemId(resp.itemId);
                setUsuarioId(resp.usuarioId);

                const proj = projetos.find(
                    (p) => p.nomeProjeto === resp.projeto || p.nome === resp.projeto
                );

                if (proj) setProjetoId(proj.id);

                setFormData({
                    id: resp.id,
                    projeto: resp.projeto || "",
                    item: "",
                    data: parseDataBR(resp.dataApontamento),
                    horaInicio: parseHoraBR(resp.horaInicio),
                    horaFim: parseHoraBR(resp.horaFim),
                    observacao: resp.observacao || ""
                });
            });

    }, [isOpen, apontamento, projetos]);

    useEffect(() => {
        if (!projetoId) return;

        listarItens(projetoId)
            .then(setItensDisponiveis)
            .catch(() => setItensDisponiveis([]));
    }, [projetoId]);
    useEffect(() => {
        if (!itemId || itensDisponiveis.length === 0) return;

        const item = itensDisponiveis.find((i: any) => i.id === itemId);

        if (item) {
            setFormData(prev => prev ? {
                ...prev,
                item: item.descricao || item.nome || item.codigo
            } : null);
        }
    }, [itemId, itensDisponiveis]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name === "projeto") {
            const proj = projetos.find(
                (p) => (p.nomeProjeto || p.nome) === value
            );

            if (proj) setProjetoId(proj.id);

            setFormData(prev => prev ? { ...prev, projeto: value } : null);
            return;
        }

        if (name === "item") {
            const idSelecionado = Number(value);

            setItemId(idSelecionado);

            const itemSelecionado = itensDisponiveis.find((i: any) => i.id === idSelecionado);

            setFormData(prev => prev ? {
                ...prev,
                item: itemSelecionado?.descricao || itemSelecionado?.nome || itemSelecionado?.codigo || ""
            } : null);

            return;
        }

        setFormData(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleValidarESalvar = useCallback(async () => {
        if (!formData) return;

        if (formData.horaFim <= formData.horaInicio) {
            alert("Hora final deve ser maior que a inicial.");
            return;
        }

        const payload = {
            itemId: itemId,
            usuarioId: usuarioId,
            dataApontamento: formatarDataApontamento(formData.data),
            horaInicio: formatarDataHora(formData.data, formData.horaInicio),
            horaFim: formatarDataHora(formData.data, formData.horaFim),
            observacao: formData.observacao
        };

        try {
            await atualizarApontamentoPatch(formData.id, payload);
            const itemSelecionado = itensDisponiveis.find(
                (i: any) => i.id === itemId
            );

            onSave({
                ...formData,
                item: itemSelecionado?.descricao || itemSelecionado?.nome || itemSelecionado?.codigo || ""
            });

            onClose();

        } catch {
            alert("Erro ao atualizar apontamento");
        }

    }, [formData, itemId, usuarioId, onSave, onClose, itensDisponiveis]);

    if (!isOpen || !formData) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[999]">
            <div className="bg-white rounded-[2.5rem] p-10 relative shadow-2xl w-full max-w-2xl mx-4 max-h-[95vh] overflow-y-auto text-black border border-gray-100">

                <button onClick={onClose} className="absolute right-8 top-8 text-gray-400 hover:text-red-500 p-2 transition-colors">
                    <X size={24} />
                </button>

                <h2 className="text-3xl text-center mb-10 font-semibold text-[#2D3748]">
                    Atualizar Apontamento
                </h2>

                <div className="space-y-7">

                    <div className="grid md:grid-cols-2 gap-6">

                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black transition-all">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Projeto</label>
                            <select name="projeto" value={formData.projeto} onChange={handleChange} className="w-full p-2 outline-none bg-transparent cursor-pointer">
                                {projetos.map(p => (
                                    <option key={p.id} value={p.nomeProjeto || p.nome}>
                                        {p.nomeProjeto || p.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative border-2 border-gray-200 rounded-2xl p-2 focus-within:border-black transition-all">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">Atividade</label>
                            <select name="item" value={itemId || ""} onChange={handleChange} className="w-full p-2 outline-none bg-transparent cursor-pointer">
                                {itensDisponiveis.map((i: any) => (
                                    <option key={i.id} value={i.id}>
                                        {i.codigo || i.nome || i.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <input type="date" name="data" value={formData.data} onChange={handleChange} className="border p-2 rounded-xl" />
                        <input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleChange} className="border p-2 rounded-xl" />
                        <input type="time" name="horaFim" value={formData.horaFim} onChange={handleChange} className="border p-2 rounded-xl" />
                    </div>

                    <textarea name="observacao" value={formData.observacao} onChange={handleChange} className="w-full border p-3 rounded-xl" />

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <button onClick={onClose} className="border rounded-xl p-3">Cancelar</button>
                        <button onClick={handleValidarESalvar} className="bg-black text-white rounded-xl p-3">
                            Salvar Alterações
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
