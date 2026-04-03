import { useState, useMemo, useEffect } from 'react';
import { PopupAlocacao, type Professional } from '../shared/components/PopupAlocacao';
import { allocationService } from '../api/AllocationService';
import Botao from "../shared/components/Botao";

interface Props {
  projetoId: number;
  projetoNome: string;
}

export const PaginaAlocacao = ({ projetoId, projetoNome }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dbProfessionals, setDbProfessionals] = useState<Professional[]>([]);
  const [selectedList, setSelectedList] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);


  // const ITEM_ID = 101;


  useEffect(() => {
    if (isModalOpen) {
      allocationService.getProfessionalsByProject()
        .then(setDbProfessionals)
        .catch(() => setMessage({ type: 'error', text: 'Erro ao carregar lista de profissionais.' }));
    }
  }, [isModalOpen]);

  const filteredProfessionals = useMemo(() => {
    if (!searchTerm) return [];
    return dbProfessionals.filter(p => {
      const isAlreadySelected = selectedList.some(s => s.id === p.id);
      const name = (p.nomeUsuario || "").toLowerCase();
      return !isAlreadySelected && name.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, selectedList, dbProfessionals]);

  const handleSave = async () => {
    if (selectedList.length === 0) return;
    setIsLoading(true);
    try {
      await allocationService.assignToItem(projetoId, selectedList.map(p => p.id));
      setMessage({ type: 'success', text: 'Alocação realizada com sucesso!' });

      setTimeout(() => {
        setIsModalOpen(false);
        setSelectedList([]);
        setMessage(null);
      }, 1500);
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Erro ao salvar alocação no banco.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-50">
      {/* Botão limpo e centralizado */}
      {/* <button
        className="btn btn-primary px-12 py-4 shadow-2xl rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95"
        onClick={() => setIsModalOpen(true)}
      >
        Alocar Profissionais
      </button> */}
      <Botao type="button"  onClick={() => setIsModalOpen(true)}>
        Alocar Funcionarios
      </Botao>

      <PopupAlocacao
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setMessage(null); }}
        projectName={projetoNome}
        message={message}
        professionals={filteredProfessionals}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedList={selectedList}
        onSelect={(p) => { setSelectedList([...selectedList, p]); setSearchTerm(''); }}
        onRemove={(id) => setSelectedList(selectedList.filter(s => s.id !== id))}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PaginaAlocacao