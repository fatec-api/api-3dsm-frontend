import { useEffect, useState, useContext } from "react";
import Input from "../shared/components/Input";
import Dropdown from "../shared/components/Dropdown";
import Botao from "../shared/components/Botao";
import { listarItensPorProfissional } from "../services/ItemService";

import { FiClock, FiCalendar } from "react-icons/fi";
import { listarProjetos } from "../services/projectService";
import instance from "../api/instance";
import { KeycloakContext } from "../contexts/KeycloakProvider";

export default function FormularioApontamento() {
    const { getUsuario } = useContext(KeycloakContext);

    const [projeto, setProjeto] = useState("");
    const [item, setItem] = useState("");
    const [itemSelecionado, setItemSelecionado] = useState<any>(null);

    const [data, setData] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFim, setHoraFim] = useState("");

    const [usarPausa, setUsarPausa] = useState(false);
    const [pausaInicio, setPausaInicio] = useState("");
    const [pausaFim, setPausaFim] = useState("");

    const [observacao, setObservacao] = useState("");

    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const [mostrarPopup, setMostrarPopup] = useState(false);

    const [horasLiquidas, setHorasLiquidas] = useState<number | null>(null);

    const [projetos, setProjetos] = useState<{ nomeProjeto: string, id: number, titulo: string }[]>([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState<any>(null);
    const [itens, setItens] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const usuario = getUsuario();
            if (!usuario?.id) return;
            try {
                const itensUsuario = await listarItensPorProfissional(usuario.id);
                setItens(Array.isArray(itensUsuario) ? itensUsuario : []);

                const projetosUnicos = itensUsuario.reduce((acc: any[], item: any) => {
                    if (!acc.some(p => p.id === item.projetoId)) {
                        acc.push({
                            id: item.projetoId,
                            nomeProjeto: item.projetoNome
                        });
                    }
                    return acc;
                }, []);

                setProjetos(projetosUnicos);
            } catch (error) {
                console.error("Erro ao carregar itens do usuário", error);
            }
        };
        loadData();
    }, []);

    function parseHora(h: string) {
        const apenasHora = h.includes("T") ? h.split("T")[1] : h;
        const [hh, mm] = apenasHora.split(":").map(Number);
        return hh * 60 + mm;
    }

    const validar = () => {
        if (!projeto || !item) return "Selecione projeto e item.";
        if (!data || !horaInicio || !horaFim) return "Preencha todos os campos obrigatórios.";

        const hojeDate = new Date();
        const dataSelecionada = new Date(data);
        hojeDate.setHours(23, 59, 59, 999);

        if (dataSelecionada > hojeDate) return "Data não pode ser futura.";

        const dataHoraInicio = new Date(horaInicio);
        const dataHoraFim = new Date(horaFim);

        if (dataHoraFim <= dataHoraInicio) return "Hora fim deve ser maior que início.";

        if (usarPausa) {
            if (!pausaInicio || !pausaFim) return "Preencha a pausa completa.";

            const dataHoraPausaInicio = new Date(pausaInicio);
            const dataHoraPausaFim = new Date(pausaFim);

            if (dataHoraPausaFim <= dataHoraPausaInicio) return "Pausa inválida.";
            if (dataHoraPausaInicio < dataHoraInicio || dataHoraPausaFim > dataHoraFim)
                return "Pausa fora do horário de trabalho.";
        }

        return "";
    };

    useEffect(() => {
        if (!horaInicio || !horaFim) {
            setHorasLiquidas(null);
            return;
        }

        let total = parseHora(horaFim) - parseHora(horaInicio);

        if (usarPausa && pausaInicio && pausaFim) {
            total -= parseHora(pausaFim) - parseHora(pausaInicio);
        }

        setHorasLiquidas(total / 60);
    }, [horaInicio, horaFim, pausaInicio, pausaFim, usarPausa]);

    const limpar = () => {
        setProjeto("");
        setItem("");
        setData("");
        setHoraInicio("");
        setHoraFim("");
        setPausaInicio("");
        setPausaFim("");
        setObservacao("");
        setUsarPausa(false);
    };
    function formatarDataApontamento(dateStr: string) {
        if (!dateStr) return null;
        const somenteData = dateStr.split("T")[0];
        return `${somenteData}T00:00:00`;
    }

    function formatarDataHora(dateStr: string) {
        if (!dateStr) return null;
        return dateStr.length === 16 ? `${dateStr}:00` : dateStr;
    }

    async function apontarHora(payload: any) {
        const response = await instance.post("/apontamento/apontamentos", payload);
        return response.data;
    }

    const itensFiltrados = Array.isArray(itens)
        ? itens.filter((i: any) => i.projetoId === projetoSelecionado?.id)
        : [];

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErro("");

        const erroValidacao = validar();
        if (erroValidacao) {
            setErro(erroValidacao);
            return;
        }

        const usuario = getUsuario();

        if (!usuario?.id) {
            setErro("Usuário não autenticado.");
            return;
        }

        const payload = {
            itemId: itemSelecionado?.id,
            usuarioId: usuario.id,
            dataApontamento: formatarDataApontamento(data),
            horaInicio: formatarDataHora(horaInicio),
            horaFim: formatarDataHora(horaFim),
            observacao,
        };

        try {
            setLoading(true);
            await apontarHora(payload);
            limpar();
            setMostrarPopup(true);
            setTimeout(() => setMostrarPopup(false), 3000);
        } catch (error: any) {
            const message = error.response?.data?.message || "Erro ao registrar apontamento.";
            setErro(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-base-100 shadow-lg rounded-2xl p-10 w-full max-w-[700px] flex flex-col gap-10"
            >
                <h1 className="text-2xl font-semibold text-base-content text-center">
                    Apontamento de Horas
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <div className="flex flex-col gap-8">
                        <Dropdown
                            label="Projeto"
                            value={projeto}
                            onChange={(e: any) => {
                                const nome = e.target.value;
                                setProjeto(nome);
                                const projObj = projetos.find(p => p.nomeProjeto === nome);
                                setProjetoSelecionado(projObj);
                                setItem("");
                                setItemSelecionado(null);
                            }}
                            options={projetos.map(p => p.nomeProjeto)}
                            widthPx={300}
                        />

                        <Dropdown
                            label="Item"
                            value={item}
                            onChange={(e: any) => {
                                const valorSelecionado = e.target.value;
                                setItem(valorSelecionado);

                                const objetoItem = itensFiltrados.find(
                                    (i: any) => i.codigo === valorSelecionado
                                );

                                setItemSelecionado(objetoItem);
                            }}
                            options={itensFiltrados.map((i: any) => i.codigo)}
                            widthPx={300}
                        />

                        <Input
                            label="Data"
                            type="datetime-local"
                            value={data}
                            onChange={(e: any) => setData(e.target.value)}
                            icon={<FiCalendar size={18} />}
                            widthPx={300}
                        />
                    </div>

                    <div className="flex flex-col gap-8">
                        <Input
                            label="Hora Início"
                            type="datetime-local"
                            value={horaInicio}
                            onChange={(e: any) => setHoraInicio(e.target.value)}
                            icon={<FiClock size={18} />}
                            widthPx={300}
                        />

                        <Input
                            label="Hora Fim"
                            type="datetime-local"
                            value={horaFim}
                            onChange={(e: any) => setHoraFim(e.target.value)}
                            icon={<FiClock size={18} />}
                            widthPx={300}
                        />

                        <Input
                            label="Observação"
                            type="text"
                            value={observacao}
                            onChange={(e: any) => setObservacao(e.target.value)}
                            widthPx={300}
                            placeholder="Digite uma observação (opcional)"
                            required={false}
                        />
                    </div>
                </div>

                {horasLiquidas !== null && (
                    <p className="text-center text-sm">
                        Horas líquidas: <strong>{horasLiquidas.toFixed(2)}h</strong>
                    </p>
                )}

                {erro && (
                    <p className="text-red-600 text-sm text-center">{erro}</p>
                )}

                <div className="flex flex-col items-center gap-6">
                    <Botao type="submit" disabled={loading}>
                        {loading ? "Salvando..." : "Apontar"}
                    </Botao>
                </div>

                {mostrarPopup && (
                    <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg z-[9999]">
                        Apontamento realizado com sucesso!
                    </div>
                )}
            </form>
        </>
    );
}
