import { useState, useEffect } from "react";
import { X } from 'lucide-react';
import Botao from '../shared/components/Botao';

interface ModalReprovarApontamentoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (justificativa: string) => void;
  isLoading?: boolean;
}

export default function ModalReprovarApontamento({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: ModalReprovarApontamentoProps) {
  const [justificativa, setJustificativa] = useState("");

  useEffect(() => {
    if (!isOpen) setJustificativa("");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (justificativa.trim().length >= 3) {
      onConfirm(justificativa);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[999]">
      <div className="bg-white rounded-[2.5rem] p-10 relative shadow-2xl w-full max-w-2xl mx-4 border border-gray-100">
        
        <button
          onClick={onClose}
          className="absolute right-8 top-8 text-gray-400 hover:text-gray-900 transition-colors p-2 cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-[#2D3748]">
            Motivo da Reprovação
          </h2>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col gap-3">
            <textarea
              id="justificativa"
              autoFocus
              className="w-full min-h-[180px] p-5 text-gray-700 bg-white border-2 border-gray-200 rounded-[1.5rem] 
                         focus:border-black focus:ring-0 transition-all outline-none resize-none shadow-sm"
              placeholder="Descreva aqui o motivo..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            {}
            <Botao
              type="button"
              disabled={isLoading || justificativa.trim().length < 3}
              onClick={handleConfirm}
              
              className="w-full max-w-xs !h-14 !text-xl font-bold flex items-center justify-center"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                'Reprovar'
              )}
            </Botao>
          </div>
        </div>
      </div>
    </div>
  );
}