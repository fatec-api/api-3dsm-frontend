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
}


export async function listarHistorico(): Promise<Log[]> {
  try {
    const response = await instance.get("/auditoria/auditorias");
    const dados = Array.isArray(response.data) ? response.data : [];

    const logs: Log[] = dados.map((item: any): Log => {
      const [dataParte, horaParte] = (item.criadoEm ?? "").split(" ");

      return {
        id: item.id ?? "",
        usuario: item.usuarioId ?? "Desconhecido",
        data: dataParte ?? "",
        hora: horaParte ?? "",
        acao: item.status ?? "Sem descrição",
        justificativa: item.justificativa ?? undefined,
        itemId: item.itemId,
        horasLiquidas: item.horasLiquidas,
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