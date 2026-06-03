import instance from "../api/instance";

export interface Log {
  id: string;
  usuario: string;
  data: string;
  hora: string;
  acao: string;
  justificativa?: string;
  itemId?: number;
  horasLiquidas?: number;
  observacao?: string;
  horaInicio?: string;
  horaFim?: string;
  dataApontamento?: string;
  apontamentoId?: number;
}

export interface LogEnriquecido extends Log {
  itemDescricao?: string;
  projetoNome?: string;
}

export async function listarHistorico(): Promise<Log[]> {
  try {
    const response = await instance.get("/auditoria/auditorias");
    const dados = Array.isArray(response.data) ? response.data : [];

    const logs: Log[] = dados.map((item: any): Log => {
      const [dataParte, horaParte] = (item.criadoEm ?? "").split(" ");
      const detalhes = item.detalhes ?? {};

      return {
        id: item.id ?? "",
        usuario: item.usuarioId ?? "Desconhecido",
        data: dataParte ?? "",
        hora: horaParte ?? "",
        acao: detalhes.status ?? item.status ?? "Sem descrição",
        justificativa: detalhes.justificativa ?? item.justificativa ?? undefined,
        itemId: detalhes.itemId ?? item.itemId,
        horasLiquidas: detalhes.horasLiquidas ?? item.horasLiquidas,
        observacao: detalhes.observacao ?? item.observacao,
        horaInicio: detalhes.horaInicio ?? item.horaInicio,
        horaFim: detalhes.horaFim ?? item.horaFim,
        dataApontamento: detalhes.dataApontamento ?? item.dataApontamento,
        apontamentoId: detalhes.apontamentoId ?? undefined,
      };
    });

    const idsUnicos = [...new Set(dados.map((item: any) => item.usuarioId).filter(Boolean))];

    const usuarios = await Promise.all(
      idsUnicos.map(async (id) => {
        try {
          const res = await instance.get(`/gestao/usuarios/${id}`);
          return { id, nome: res.data.nomeUsuario };
        } catch {
          return { id, nome: id };
        }
      })
    );

    const mapaUsuarios = Object.fromEntries(usuarios.map((u) => [u.id, u.nome]));

    return logs.map((log) => ({
      ...log,
      usuario: mapaUsuarios[log.usuario] ?? log.usuario,
    }));

  } catch (error) {
    console.error({ event: "API_ERROR", action: "listarHistorico", error });
    return [];
  }
}

export async function enriquecerLogsParaExport(logs: Log[]): Promise<LogEnriquecido[]> {
  const ids = logs
    .map((l) => l.apontamentoId)
    .filter((id): id is number => id != null);

  if (ids.length === 0) return logs;

  try {
    const res = await instance.get("/apontamento/apontamentos/lote", { params: { ids: ids.join(",") } });
    const apontamentos: any[] = Array.isArray(res.data) ? res.data : [];

    const mapa = Object.fromEntries(
      apontamentos.map((a) => [a.id, { itemDescricao: a.itemDescricao, projetoNome: a.projetoNome }])
    );

    return logs.map((log) => {
      const enrich = log.apontamentoId != null ? mapa[log.apontamentoId] : undefined;
      return { ...log, ...enrich };
    });
  } catch (error) {
    console.error({ event: "API_ERROR", action: "enriquecerLogsParaExport", error });
    return logs;
  }
}
