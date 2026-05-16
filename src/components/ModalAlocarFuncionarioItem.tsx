import { X, Users } from 'lucide-react';
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
  selectedList: Profissional[];
  onSelect: (p: Profissional) => void;
  onRemove: (id: string) => void;
  onSave: () => void;
  isLoading: boolean;
  message: { type: 'success' | 'error'; text: string } | null;
}

export default function ModalAlocarFuncionarioItem({
  isOpen, onClose, itemName, profissionais,
  selectedList, onSelect, onRemove, onSave, isLoading, message
}: ModalAlocarFuncionarioItemProps) {
  if (!isOpen) return null;

  // Apenas profissionais ainda não selecionados aparecem no dropdown
  const disponiveis = profissionais.filter(
    (p) => !selectedList.some((s) => s.id === p.id)
  );

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

          {/* Dropdown de seleção */}
          <div className="dropdown w-full">
            <div tabIndex={0} className="select select-bordered w-full cursor-pointer text-gray-500">
              {disponiveis.length > 0 ? 'Selecione um profissional...' : 'Nenhum profissional disponível'}
            </div>
            {disponiveis.length > 0 && (
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                {disponiveis.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(p);
                      }}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{p.nomeUsuario}</span>
                        {p.email && <span className="text-xs text-gray-400">{p.email}</span>}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tags dos selecionados */}
          <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 min-h-[72px]">
            <p className="text-xs font-black text-gray-400 mb-2 flex items-center gap-2 uppercase">
              <Users size={14} /> Selecionados ({selectedList.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedList.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm text-gray-700 shadow-sm"
                >
                  <span className="font-medium">{p.nomeUsuario}</span>
                  <X
                    size={14}
                    className="cursor-pointer text-red-400 hover:text-red-600"
                    onClick={() => onRemove(p.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {message && (
            <div className={`alert py-3 rounded-xl border ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <span className="text-sm font-bold text-center w-full">{message.text}</span>
            </div>
          )}

          <div className="flex justify-center pt-2">
            <Botao
              type="button"
              disabled={isLoading || selectedList.length === 0}
              onClick={onSave}
            >
              {isLoading
                ? <span className="loading loading-spinner loading-sm"></span>
                : 'Registrar'}
            </Botao>
          </div>

        </div>
      </div>
    </div>
  );
}