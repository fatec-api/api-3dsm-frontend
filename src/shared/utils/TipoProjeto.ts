export const TipoProjeto = {
    Alocacao: "Alocação",
    Fechado: "Hora Fechada"
} as const

export type TipoProjeto = (typeof TipoProjeto)[keyof typeof TipoProjeto]


// para usar enum teria que remover a regra "erasableSyntaxOnly": true
// pode causar problemas no futuro com o vite no futuro
// essa sintaxe é aceita pela regra e funciona melhor no vite