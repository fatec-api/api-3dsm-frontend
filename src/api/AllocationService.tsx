import type { Professional } from '../shared/components/PopupAlocacao';
import instance from './instance';
interface Associacao {
  gestorId: string;
  gestorNome: string;
  projetoId: number;
  projetoNome: string;
  usuarioId: string[];
}

export const allocationService = {
  
  getProfessionalsByProject: async (): Promise<Professional[]> => {
    const response = await instance.get('/gestao/alocacoes/profissionais-ativos');
    return response.data;
  },

  assignToItem: async (projetoId: number, profissionalIds: string[]) => {
    await instance.post('/gestao/associar-projeto', {
      projetoId: projetoId,
      usuarioId: profissionalIds,
    });
  },

  getAssociacoes: async (): Promise<Associacao[]> => {
    const response = await instance.get('/gestao/associacoes');
    return response.data;
  }
};