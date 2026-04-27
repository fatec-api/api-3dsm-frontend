import api from "./api"

export interface MetricasAtividade {
    horasPrevistasAtiv: number
    horasRealizadasAtiv: number
    nivelAtividade: 'ANALISE' | 'DESENVOLVIMENTO' | 'TESTE'
}

export const getApontamentosAprovadosPorProjeto = async (projetoId: number): Promise<MetricasAtividade[]> => {
    //mock
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { nivelAtividade: 'ANALISE', horasPrevistasAtiv: 100, horasRealizadasAtiv: 70 }, 
                { nivelAtividade: 'DESENVOLVIMENTO', horasPrevistasAtiv: 200, horasRealizadasAtiv: 250 }, 
                { nivelAtividade: 'TESTE', horasPrevistasAtiv: 50, horasRealizadasAtiv: 45 } 
            ]);
        }, 800);
    });

    //Conexão com a api do back
    
    // try {
    //     const response = await api.get(`/apontamentos/aprovado/projeto/${projetoId}`);
    //     return response.data;
    // } catch (error) {
    //     console.error("Erro ao buscar apontamentos do projeto:", error);
    //     throw error;
    // }
};

export async function listarApontamentos() {
    const response = await api.get(`/apontamentos`)
    return response.data
}

export async function listarApontamentosUsuarios(id: string) {
    const response = await api.get(`apontamentos/usuario/${id}`);
    return response.data;
}

export function listarApontamentosPorProjeto() {
    // const response = await api.get(`apontamentos/projeto/${id}`);
    // return response.data;
    return Promise.resolve([
    { "id": "1", "usuario": "João Silva", "projeto": "Projeto A", "item": "Desenvolvimento de funcionalidade X", "nivel": "Desenvolvimento", "data": "2024-06-15", "inicio": "09:00", "fim": "17:00", "status": "Aprovado" },
    { "id": "2", "usuario": "Maria Oliveira", "projeto": "Projeto B", "item": "Refatoração de código legado", "nivel": "Desenvolvimento", "data": "2024-06-15", "inicio": "08:30", "fim": "12:00", "status": "Pendente" },
    { "id": "3", "usuario": "Carlos Souza", "projeto": "Projeto A", "item": "Criação de testes unitários", "nivel": "Qualidade", "data": "2024-06-15", "inicio": "10:00", "fim": "13:00", "status": "Pendente" },
    { "id": "4", "usuario": "Ana Costa", "projeto": "Projeto C", "item": "Reunião de alinhamento técnico", "nivel": "Gestão", "data": "2024-06-16", "inicio": "09:00", "fim": "10:30", "status": "Pendente" },
    { "id": "5", "usuario": "João Silva", "projeto": "Projeto A", "item": "Correção de bug crítico em produção", "nivel": "Suporte", "data": "2024-06-16", "inicio": "14:00", "fim": "18:00", "status": "Pendente" },
    { "id": "6", "usuario": "Maria Oliveira", "projeto": "Projeto B", "item": "Modelagem de banco de dados", "nivel": "Arquitetura", "data": "2024-06-17", "inicio": "09:00", "fim": "11:30", "status": "Pendente" },
    { "id": "7", "usuario": "Ricardo Mendes", "projeto": "Projeto D", "item": "Implementação de API Rest", "nivel": "Desenvolvimento", "data": "2024-06-17", "inicio": "13:00", "fim": "17:00", "status": "Pendente" },
    { "id": "8", "usuario": "Juliana Lima", "projeto": "Projeto A", "item": "Documentação de endpoint", "nivel": "Documentação", "data": "2024-06-18", "inicio": "08:00", "fim": "10:00", "status": "Pendente" },
    { "id": "9", "usuario": "Carlos Souza", "projeto": "Projeto C", "item": "Revisão de Pull Request", "nivel": "Desenvolvimento", "data": "2024-06-18", "inicio": "14:00", "fim": "15:30", "status": "Aprovado" },
    { "id": "10", "usuario": "Ana Costa", "projeto": "Projeto B", "item": "Planejamento de Sprint", "nivel": "Gestão", "data": "2024-06-19", "inicio": "09:00", "fim": "12:00", "status": "Pendente" },
    { "id": "11", "usuario": "João Silva", "projeto": "Projeto A", "item": "Deploy em ambiente de homologação", "nivel": "DevOps", "data": "2024-06-19", "inicio": "16:00", "fim": "17:30", "status": "Pendente" },
    { "id": "12", "usuario": "Maria Oliveira", "projeto": "Projeto D", "item": "Ajustes de UI/UX no frontend", "nivel": "Desenvolvimento", "data": "2024-06-20", "inicio": "08:00", "fim": "12:00", "status": "Pendente" },
    { "id": "13", "usuario": "Ricardo Mendes", "projeto": "Projeto B", "item": "Otimização de queries SQL", "nivel": "Desenvolvimento", "data": "2024-06-20", "inicio": "13:30", "fim": "16:00", "status": "Pendente" },
    { "id": "14", "usuario": "Juliana Lima", "projeto": "Projeto C", "item": "Escrita de User Stories", "nivel": "Gestão", "data": "2024-06-21", "inicio": "10:00", "fim": "12:30", "status": "Pendente" },
    { "id": "15", "usuario": "Carlos Souza", "projeto": "Projeto A", "item": "Configuração de variáveis de ambiente", "nivel": "DevOps", "data": "2024-06-21", "inicio": "15:00", "fim": "16:30", "status": "Pendente" },
    { "id": "16", "usuario": "Ana Costa", "projeto": "Projeto D", "item": "Análise de requisitos funcionais", "nivel": "Gestão", "data": "2024-06-22", "inicio": "09:00", "fim": "11:00", "status": "Pendente" },
    { "id": "17", "usuario": "João Silva", "projeto": "Projeto B", "item": "Desenvolvimento de módulo de login", "nivel": "Desenvolvimento", "data": "2024-06-24", "inicio": "08:30", "fim": "17:30", "status": "Pendente" },
    { "id": "18", "usuario": "Maria Oliveira", "projeto": "Projeto C", "item": "Execução de testes de carga", "nivel": "Qualidade", "data": "2024-06-24", "inicio": "14:00", "fim": "16:00", "status": "Pendente" },
    { "id": "19", "usuario": "Ricardo Mendes", "projeto": "Projeto A", "item": "Integração com gateway de pagamento", "nivel": "Desenvolvimento", "data": "2024-06-25", "inicio": "09:00", "fim": "18:00", "status": "Pendente" },
    { "id": "20", "usuario": "Juliana Lima", "projeto": "Projeto B", "item": "Atualização de manual do usuário", "nivel": "Documentação", "data": "2024-06-25", "inicio": "13:00", "fim": "15:00", "status": "Pendente" },
    { "id": "21", "usuario": "Carlos Souza", "projeto": "Projeto D", "item": "Correção de vulnerabilidades", "nivel": "Segurança", "data": "2024-06-26", "inicio": "08:00", "fim": "12:00", "status": "Pendente" },
    { "id": "22", "usuario": "Ana Costa", "projeto": "Projeto A", "item": "Daily Scrum", "nivel": "Gestão", "data": "2024-06-26", "inicio": "09:00", "fim": "09:30", "status": "Aprovado" },
    { "id": "23", "usuario": "João Silva", "projeto": "Projeto C", "item": "Migração de servidor", "nivel": "DevOps", "data": "2024-06-27", "inicio": "22:00", "fim": "23:59", "status": "Pendente" },
    { "id": "24", "usuario": "Maria Oliveira", "projeto": "Projeto A", "item": "Criação de componentes React", "nivel": "Desenvolvimento", "data": "2024-06-27", "inicio": "10:00", "fim": "16:00", "status": "Pendente" },
    { "id": "25", "usuario": "Ricardo Mendes", "projeto": "Projeto B", "item": "Treinamento para novos devs", "nivel": "Treinamento", "data": "2024-06-28", "inicio": "14:00", "fim": "17:00", "status": "Pendente" },
    { "id": "26", "usuario": "Juliana Lima", "projeto": "Projeto D", "item": "Mapeamento de processos", "nivel": "Negócios", "data": "2024-06-28", "inicio": "09:00", "fim": "11:00", "status": "Pendente" },
    { "id": "27", "usuario": "Carlos Souza", "projeto": "Projeto C", "item": "Desenvolvimento de filtros", "nivel": "Desenvolvimento", "data": "2024-06-29", "inicio": "08:30", "fim": "12:30", "status": "Pendente" },
    { "id": "28", "usuario": "Ana Costa", "projeto": "Projeto B", "item": "Reunião com Stakeholders", "nivel": "Gestão", "data": "2024-06-29", "inicio": "15:00", "fim": "16:30", "status": "Pendente" },
    { "id": "29", "usuario": "João Silva", "projeto": "Projeto D", "item": "Ajuste de estilos CSS", "nivel": "Desenvolvimento", "data": "2024-06-30", "inicio": "13:00", "fim": "15:30", "status": "Pendente" },
    { "id": "30", "usuario": "Maria Oliveira", "projeto": "Projeto A", "item": "Configuração de SSL", "nivel": "DevOps", "data": "2024-06-30", "inicio": "16:00", "fim": "17:00", "status": "Pendente" },
    { "id": "31", "usuario": "Ricardo Mendes", "projeto": "Projeto C", "item": "Setup de ambiente", "nivel": "Suporte", "data": "2024-07-01", "inicio": "09:00", "fim": "11:00", "status": "Pendente" },
    { "id": "32", "usuario": "Juliana Lima", "projeto": "Projeto B", "item": "Pesquisa de mercado", "nivel": "Negócios", "data": "2024-07-01", "inicio": "14:00", "fim": "16:00", "status": "Pendente" },
    { "id": "33", "usuario": "Carlos Souza", "projeto": "Projeto A", "item": "Revisão de segurança em código", "nivel": "Segurança", "data": "2024-07-02", "inicio": "08:00", "fim": "10:00", "status": "Pendente" },
    { "id": "34", "usuario": "Ana Costa", "projeto": "Projeto D", "item": "Apresentação de protótipo", "nivel": "Gestão", "data": "2024-07-02", "inicio": "11:00", "fim": "12:00", "status": "Pendente" },
    { "id": "35", "usuario": "João Silva", "projeto": "Projeto B", "item": "Implementação de Webhooks", "nivel": "Desenvolvimento", "data": "2024-07-03", "inicio": "10:00", "fim": "15:00", "status": "Pendente" },
    { "id": "36", "usuario": "Maria Oliveira", "projeto": "Projeto C", "item": "Ajustes de acessibilidade WCAG", "nivel": "Desenvolvimento", "data": "2024-07-03", "inicio": "09:00", "fim": "12:00", "status": "Pendente" },
    { "id": "37", "usuario": "Ricardo Mendes", "projeto": "Projeto A", "item": "Backup de base de dados", "nivel": "DevOps", "data": "2024-07-04", "inicio": "23:00", "fim": "23:59", "status": "Pendente" },
    { "id": "38", "usuario": "Juliana Lima", "projeto": "Projeto B", "item": "Criação de FAQs", "nivel": "Documentação", "data": "2024-07-04", "inicio": "10:00", "fim": "11:30", "status": "Pendente" },
    { "id": "39", "usuario": "Carlos Souza", "projeto": "Projeto D", "item": "Testes de integração", "nivel": "Qualidade", "data": "2024-07-05", "inicio": "13:00", "fim": "16:00", "status": "Pendente" },
    { "id": "40", "usuario": "Ana Costa", "projeto": "Projeto C", "item": "Brainstorming de novas features", "nivel": "Gestão", "data": "2024-07-05", "inicio": "16:00", "fim": "17:30", "status": "Aprovado" },
    { "id": "41", "usuario": "João Silva", "projeto": "Projeto A", "item": "Sincronização de branch main", "nivel": "Desenvolvimento", "data": "2024-07-06", "inicio": "08:30", "fim": "09:30", "status": "Pendente" },
    { "id": "42", "usuario": "Maria Oliveira", "projeto": "Projeto D", "item": "Otimização de assets de imagem", "nivel": "Desenvolvimento", "data": "2024-07-06", "inicio": "14:00", "fim": "15:30", "status": "Pendente" },
    { "id": "43", "usuario": "Ricardo Mendes", "projeto": "Projeto B", "item": "Resolução de conflitos Git", "nivel": "Desenvolvimento", "data": "2024-07-07", "inicio": "10:00", "fim": "12:00", "status": "Pendente" },
    { "id": "44", "usuario": "Juliana Lima", "projeto": "Projeto A", "item": "Revisão de termos de uso", "nivel": "Documentação", "data": "2024-07-07", "inicio": "15:00", "fim": "16:30", "status": "Pendente" },
    { "id": "45", "usuario": "Carlos Souza", "projeto": "Projeto C", "item": "Ajuste de performance backend", "nivel": "Desenvolvimento", "data": "2024-07-08", "inicio": "09:00", "fim": "11:00", "status": "Pendente" },
    { "id": "46", "usuario": "Ana Costa", "projeto": "Projeto D", "item": "Revisão orçamentária", "nivel": "Gestão", "data": "2024-07-08", "inicio": "14:00", "fim": "15:00", "status": "Pendente" },
    { "id": "47", "usuario": "João Silva", "projeto": "Projeto B", "item": "Instalação de pacotes NPM", "nivel": "Desenvolvimento", "data": "2024-07-09", "inicio": "10:00", "fim": "10:30", "status": "Pendente" },
    { "id": "48", "usuario": "Maria Oliveira", "projeto": "Projeto C", "item": "Criação de dashboard", "nivel": "Desenvolvimento", "data": "2024-07-09", "inicio": "11:00", "fim": "16:00", "status": "Pendente" },
    { "id": "49", "usuario": "Ricardo Mendes", "projeto": "Projeto A", "item": "Configuração de roteamento", "nivel": "Desenvolvimento", "data": "2024-07-10", "inicio": "09:00", "fim": "11:00", "status": "Pendente" },
    { "id": "50", "usuario": "Juliana Lima", "projeto": "Projeto D", "item": "Análise de métricas de uso", "nivel": "Gestão", "data": "2024-07-10", "inicio": "14:00", "fim": "15:30", "status": "Pendente" }
]);
}

export async function aprovarApontamento(id: string) {
    const response = await api.put(`apontamentos/aprovar/${id}`);
    return response.data;
}

export async function aprovarApontamentos(ids: string[]) {
    // const response = await api.put('/apontamentos/aprovar', { ids });
    // return response.data;
    return Promise.resolve({ message: "Apontamentos aprovados com sucesso", ids });
}

export async function reprovarApontamento(id: string, justificativa: string) {
    // const response = await api.put(`/apontamentos/reprovar/${id}`, { justificativa });
    // return response.data;
    
    console.warn(`[MOCK API] Chamada simulada para ID: ${id} | Justificativa: ${justificativa}`);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ message: "Reprovado com sucesso (MOCK)", id, justificativa });
        }, 800);
    });

}