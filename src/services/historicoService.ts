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

const mockLogs: Log[] = [
  {
    usuario: "João Silva",
    data: "2026-04-10",
    hora: "08:00 - 12:00",
    acao: "Implementação API",
    justificativa: "-",
  },
  {
    usuario: "Maria Santos",
    data: "2026-04-09",
    hora: "13:00 - 17:00",
    acao: "Correção de bug",
    justificativa: "-",
  },
  {
    usuario: "João Silva",
    data: "2026-04-08",
    hora: "09:00 - 11:00",
    acao: "Refatoração",
    justificativa: "Horas inconsistentes",
  },
  {
    usuario: "Pedro Costa",
    data: "2026-04-07",
    hora: "10:00 - 12:00",
    acao: "Documentação técnica",
    justificativa: "-",
  },
  {
    usuario: "Ana Oliveira",
    data: "2026-04-06",
    hora: "08:00 - 12:00",
    acao: "Implementação Frontend",
    justificativa: "-",
  },
  {
    usuario: "Maria Santos",
    data: "2026-04-05",
    hora: "13:00 - 16:00",
    acao: "Testes unitários",
    justificativa: "Cobertura insuficiente",
  },
  {
    usuario: "João Silva",
    data: "2026-04-04",
    hora: "09:00 - 11:00",
    acao: "Ajuste de layout",
    justificativa: "-",
  },
  {
    usuario: "Carlos Lima",
    data: "2026-04-03",
    hora: "14:00 - 16:00",
    acao: "Reunião com cliente",
    justificativa: "-",
  },
  {
    usuario: "Pedro Costa",
    data: "2026-04-02",
    hora: "10:00 - 13:00",
    acao: "Correção backend",
    justificativa: "Erro não reproduzido",
  },
  {
    usuario: "Ana Oliveira",
    data: "2026-04-01",
    hora: "15:00 - 18:00",
    acao: "Deploy aplicação",
    justificativa: "-",
  },
  {
    usuario: "João Silva",
    data: "2026-03-31",
    hora: "08:00 - 12:00",
    acao: "Refatoração código",
    justificativa: "-",
  },
  {
    usuario: "Carlos Lima",
    data: "2026-03-30",
    hora: "09:00 - 11:00",
    acao: "Análise de requisitos",
    justificativa: "-",
  },
  {
    usuario: "Maria Santos",
    data: "2026-03-29",
    hora: "13:00 - 17:00",
    acao: "Criação de testes",
    justificativa: "Faltou cenário",
  },
  {
    usuario: "Ana Oliveira",
    data: "2026-03-28",
    hora: "10:00 - 12:00",
    acao: "Integração API",
    justificativa: "-",
  },
  {
    usuario: "João Silva",
    data: "2026-03-27",
    hora: "14:00 - 17:00",
    acao: "Correção UI",
    justificativa: "-",
  },
  {
    usuario: "Carlos Lima",
    data: "2026-03-26",
    hora: "09:00 - 11:00",
    acao: "Planejamento sprint",
    justificativa: "-",
  },
  {
    usuario: "Pedro Costa",
    data: "2026-03-25",
    hora: "11:00 - 15:00",
    acao: "Debug sistema",
    justificativa: "Erro persistente",
  },
  {
    usuario: "Ana Oliveira",
    data: "2026-03-24",
    hora: "13:00 - 16:00",
    acao: "Validação final",
    justificativa: "-",
  },
];

export async function listarHistorico(): Promise<Log[]> {
  try {
    const response = await instance.get("/auditoria/auditorias");
    const dados = Array.isArray(response.data) ? response.data : [];

    return dados.map((item: any): Log => {
      const [dataParte, horaParte] = (item.criadoEm ?? "").split(" ");

      return {
        id: item.id ?? "",
        usuario: item.usuarioId ?? "Desconhecido",
        data: dataParte ?? "",
        hora: horaParte ?? "",
        acao: item.observacao ?? "Sem descrição",
        justificativa: undefined,
        itemId: item.itemId,
        horasLiquidas: item.horasLiquidas,
      };
    });
  } catch (error) {
    console.warn("Erro ao buscar histórico da API, usando dados mockados:", error);
    return mockLogs;
  }
}