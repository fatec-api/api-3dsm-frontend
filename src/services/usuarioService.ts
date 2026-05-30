import instance from "../api/instance";

export interface Usuario {
    id: string;
    nomeUsuario: string;
    email: string;
    cargo: String[];
    nivelExperiencia?: string;
    valorHora?: number;
    ativo: boolean;
}

export async function listarUsuariosAtivos(): Promise<Usuario[]> {
    try {
        const response = await instance.get("/gestao/usuarios/ativos");
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "listarUsuariosAtivos", error });
        throw error;
    }
}

export async function listarGestores(): Promise<Usuario[]> {
    const usuarios = await listarUsuariosAtivos();
    return usuarios.filter(u => u.cargo.includes("GESTOR"));
}

export async function buscarUsuarioPorId(id: string): Promise<Usuario> {
    try {
        const response = await instance.get(`/gestao/usuarios/${id}`);
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "buscarUsuarioPorId", error });
        throw error;
    }
}