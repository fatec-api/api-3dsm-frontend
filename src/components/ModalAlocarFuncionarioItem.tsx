import { X } from 'lucide-react';
import Botao from '../shared/components/Botao';

export interface Profissional {
  id: string;
  nomeUsuario: string;
  email: string;
}

interface ModalAlocarFuncionarioItemProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  profissionais: Profissional[];
  selectedId: string;
  onSelect: (id: string) => void;
  onSave: () => void;
  isLoading: boolean;
  message: { type: 'success' | 'error'; text: string } | null;
}

export default function ModalAlocarFuncionarioItem({
  isOpen, onClose, itemName, profissionais,
  selectedId, onSelect, onSave, isLoading, message
}: ModalAlocarFuncionarioItemProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-999">
      <div className="bg-white rounded-[2.5rem] p-10 relative shadow-2xl w-full max-w-lg mx-4">

        <button
          onClick={onClose}
          className="absolute right-8 top-8 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#2D3748] mb-8">
          Alocar Funcionário ao {itemName}
        </h2>

        <div className="space-y-6">

          <div className="dropdown w-full">
            <div tabIndex={0} className="select select-bordered w-full cursor-pointer">
              {selectedId || "Selecione"}
            </div>
            <ul className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-full">
              {profissionais.map(p => (
                <li key={p.id}>
                  <a onClick={() => onSelect(p.id)}>
                    {p.nomeUsuario}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {message && (
            <div className={`alert py-3 rounded-xl border ${message.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
              }`}>
              <span className="text-sm font-bold text-center w-full">{message.text}</span>
            </div>
          )}

          <div className="flex justify-center pt-2">
            <Botao
              type="button"
              disabled={isLoading || !selectedId}
              onClick={onSave}
            >
              {isLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Registrar'}
            </Botao>
          </div>

        </div>
      </div>
    </div>
  );
}