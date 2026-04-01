import type { Professional } from '../shared/components/PopupAlocacao';

const API_BASE_URL = 'http://localhost:8080/api';

export const allocationService = {
  
  getProfessionalsByProject: async (projectId: number): Promise<Professional[]> => {
    const response = await fetch(`${API_BASE_URL}/alocacoes/projeto/${projectId}/profissionais`);
    if (!response.ok) throw new Error('Erro ao carregar profissionais.');
    return response.json();
  },

 
  assignToItem: async (projectId: number, itemId: number, professionalIds: string[]) => {
    const response = await fetch(`${API_BASE_URL}/alocacoes/vincular`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, itemId, professionalIds }),
    });
    if (!response.ok) throw new Error('Erro ao salvar alocação.');
  }
};