import api from "./api";

export type NivelAtividade = "ANALISE" | "DESENVOLVIMENTO" | "TESTE";

export function listarItens() {
    return Promise.resolve([
        {
            codigo: "ITEM-001",
            descricao: "Analisar requisitos do módulo de autenticação",
            nivelAtividade: "ANALISE" as NivelAtividade
        },
        {
            codigo: "ITEM-002",
            descricao: "Desenvolver endpoint de listagem de projetos",
            nivelAtividade: "DESENVOLVIMENTO" as NivelAtividade
        },
        {
            codigo: "ITEM-003",
            descricao: "Testar integração com o banco de dados",
            nivelAtividade: "TESTE" as NivelAtividade
        },
        {
            codigo: "ITEM-004",
            descricao: "Revisar documentação da API REST",
            nivelAtividade: "ANALISE" as NivelAtividade
        },
        {
            codigo: "ITEM-005",
            descricao: "Implementar tela de cadastro de usuários",
            nivelAtividade: "DESENVOLVIMENTO" as NivelAtividade
        },
        {
            codigo: "ITEM-006",
            descricao: "Corrigir bug no cálculo de previsão de horas",
            nivelAtividade: "TESTE" as NivelAtividade
        },
    ])
}