import api from "./api";

export function listarProjetos() {
    return Promise.resolve([
        {
            nomeProjeto: "Projeto A",
            tipoProjeto: "Alocação",
            status: "Em andamento"
        },
        {
            nomeProjeto: "Projeto B",
            tipoProjeto: "Hora Fechada",
            status: "Em andamento"
        },{
            nomeProjeto: "Projeto C",
            tipoProjeto: "Alocação",
            status: "Concluído"
        },
        {
            nomeProjeto: "Projeto D",
            tipoProjeto: "Hora Fechada",
            status: "Em andamento"
        },{
            nomeProjeto: "Projeto W",
            tipoProjeto: "Alocação",
            status: "Planejamento"
        },
        {
            nomeProjeto: "Projeto X",
            tipoProjeto: "Hora Fechada",
            status: "Planejamento"
        },{
            nomeProjeto: "Projeto Y",
            tipoProjeto: "Alocação",
            status: "Em andamento"
        },
        {
            nomeProjeto: "Projeto Z",
            tipoProjeto: "Hora Fechada",
            status: "Concluído"
        },
    ])
}