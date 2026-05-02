import type { Professional } from '../shared/components/PopupAlocacao';

const API_BASE_URL = 'http://localhost:8082';

export const allocationService = {
  
  getProfessionalsByProject: async (): Promise<Professional[]> => {
    const response = await fetch(`${API_BASE_URL}/alocacoes/profissionais-ativos`);
    if (!response.ok) throw new Error('Erro ao carregar profissionais.');
    return response.json();
  },

 
  assignToItem: async (projetoId: number, profissionalIds: string[]) => {
    const response = await fetch(`${API_BASE_URL}/associar-projeto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projetoId: projetoId,
        usuarioId: profissionalIds }),
    });
    if (!response.ok) throw new Error('Erro ao salvar alocação.');
  }
};