import api from "./api";

export async function listarProjetos() {
    const response = await api.get("/listar/projetos")
    return response.data
    // return Promise.resolve([
    //     {
    //         nomeProjeto: "Projeto A",
    //         tipoProjeto: "Alocação",
    //         status: "Em andamento"
    //     },
    //     {
    //         nomeProjeto: "Projeto B",
    //         tipoProjeto: "Hora Fechada",
    //         status: "Em andamento"
    //     },{
    //         nomeProjeto: "Projeto C",
    //         tipoProjeto: "Alocação",
    //         status: "Concluído"
    //     },
    //     {
    //         nomeProjeto: "Projeto D",
    //         tipoProjeto: "Hora Fechada",
    //         status: "Em andamento"
    //     },{
    //         nomeProjeto: "Projeto W",
    //         tipoProjeto: "Alocação",
    //         status: "Planejamento"
    //     },
    //     {
    //         nomeProjeto: "Projeto X",
    //         tipoProjeto: "Hora Fechada",
    //         status: "Planejamento"
    //     },{
    //         nomeProjeto: "Projeto Y",
    //         tipoProjeto: "Alocação",
    //         status: "Em andamento"
    //     },
    //     {
    //         nomeProjeto: "Projeto Z",
    //         tipoProjeto: "Hora Fechada",
    //         status: "Concluído"
    //     },
    // ])
}