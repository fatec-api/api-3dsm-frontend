import { useEffect, useState } from "react";
import Input from "../shared/components/Input";
import Dropdown from "../shared/components/Dropdown";
import Botao from "../shared/components/Botao";

import { FiClock, FiCalendar } from "react-icons/fi";
import { listarProjetos } from "../services/projectService";
import { useParams } from "react-router-dom";
import instance from "../api/instance";

export default function FormularioApontamento() {
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
    const { projetoId } = useParams<{ projetoId: string }>();
    const [itens, setItens] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const listaProjetos = await listarProjetos();
                setProjetos(listaProjetos);
            } catch (error) {
                console.error("Erro ao carregar dados", error);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        async function itensPorProjeto() {
            const idParaBusca = projetoSelecionado?.id;

            if (!idParaBusca) {
                setItens([]);
                return;
            }

            try {
                setLoading(true);
                const response = await instance.get(`/gestao/itens/projeto/${idParaBusca}`); // ← trocado
                setItens(response.data);
            } catch (error) {
                console.error(error);
                setErro("Erro ao carregar itens deste projeto.");
            } finally {
                setLoading(false);
            }
        }

        itensPorProjeto();
    }, [projetoSelecionado]);

    function parseHora(h: string) {
        const apenasHora = h.includes("T") ? h.split("T")[1] : h;
        const [hh, mm] = apenasHora.split(":").map(Number);
        return hh * 60 + mm;
    }

    const validar = () => {
        if (!projeto || !item) {
            return "Selecione projeto e item.";
        }

        if (!data || !item || !horaInicio || !horaFim) {
            return "Preencha todos os campos obrigatórios.";
        }

        const hojeDate = new Date();
        const dataSelecionada = new Date(data);
        hojeDate.setHours(23, 59, 59, 999);
        if (dataSelecionada > hojeDate) {
            return "Data não pode ser futura.";
        }

        const dataHoraInicio = new Date(horaInicio);
        const dataHoraFim = new Date(horaFim);

        if (dataHoraFim <= dataHoraInicio) {
            return "Hora fim deve ser maior que início.";
        }

        if (usarPausa) {
            if (!pausaInicio || !pausaFim) {
                return "Preencha a pausa completa.";
            }

            const dataHoraPausaInicio = new Date(pausaInicio);
            const dataHoraPausaFim = new Date(pausaFim);

            if (dataHoraPausaFim <= dataHoraPausaInicio) {
                return "Pausa inválida.";
            }

            if (dataHoraPausaInicio < dataHoraInicio || dataHoraPausaFim > dataHoraFim) {
                return "Pausa fora do horário de trabalho.";
            }
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

    async function apontarHora(payload: any) {
        const response = await instance.post("/apontamento/apontamentos/", payload);
        return response.data;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErro("");

        const erroValidacao = validar();
        if (erroValidacao) {
            setErro(erroValidacao);
            return;
        }

        const payload = {
            projeto,
            projetoId: projetoSelecionado?.id,
            itemId: itemSelecionado?.id,
            nivel: item.includes(" - ") ? item.split(" - ")[1].trim() : "",
            dataApontamento: data,
            horaInicio,
            horaFim,
            pausaInicio: usarPausa ? pausaInicio : null,
            pausaFim: usarPausa ? pausaFim : null,
            usuarioId: "550e8400-e29b-41d4-a716-446655440010",
            observacao,
        };

        console.log(payload);

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
                className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-[700px] flex flex-col gap-10"
            >
                <h1 className="text-2xl font-semibold text-gray-800 text-center">
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
                                const objetoItem = itens.find((i: any) => i.titulo === valorSelecionado);
                                console.log("Objeto encontrado:", objetoItem);
                                setItemSelecionado(objetoItem);
                            }}
                            options={itens.map((i: any) => (typeof i === 'string' ? i : i.titulo))}
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