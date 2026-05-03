import type { Professional } from '../shared/components/PopupAlocacao';
import instance from './instance';

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
  }
};