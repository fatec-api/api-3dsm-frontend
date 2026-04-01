import { Search, X, CheckCircle2, Users } from 'lucide-react';


export interface Professional {
  id: string;
  nomeUsuario: string; 
  email: string;
}

interface PopupAlocacaoProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string; 
  professionals: Professional[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedList: Professional[];
  onSelect: (p: Professional) => void;
  onRemove: (id: string) => void;
  onSave: () => void;
  isLoading: boolean;
  message: { type: 'success' | 'error'; text: string } | null;
}

export const PopupAlocacao = ({
  isOpen, onClose, projectName, professionals, searchTerm, 
  onSearchChange, selectedList, onSelect, onRemove, onSave, 
  isLoading, message 
}: PopupAlocacaoProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open bg-black/40 backdrop-blur-sm z-[999]">
      <div className="modal-box max-w-2xl bg-white rounded-[2.5rem] p-10 relative border-none shadow-2xl">
        <button onClick={onClose} className="absolute right-8 top-8 text-gray-400 hover:text-gray-900 transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#2D3748] mb-8">
          Alocar Profissionais ao {projectName}
        </h2>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              className="input input-bordered w-full h-14 pl-12 rounded-xl bg-white text-gray-800 focus:border-[#2D3748]"
              placeholder="Pesquise por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && professionals.length > 0 && (
              <ul className="absolute z-50 w-full bg-white border rounded-xl mt-1 shadow-xl max-h-40 overflow-auto p-2">
                {professionals.map(p => (
                  <li key={p.id} onClick={() => onSelect(p)} className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex justify-between text-gray-700">
                    <div className="flex flex-col">
                      {/* CORREÇÃO AQUI: p.nomeUsuario */}
                      <span className="font-bold">{p.nomeUsuario}</span> 
                      <span className="text-xs text-gray-500">{p.email}</span>
                    </div>
                    <CheckCircle2 size={18} className="text-gray-300" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 min-h-[80px]">
            <p className="text-xs font-black text-gray-400 mb-2 flex items-center gap-2 uppercase">
              <Users size={14}/> Selecionados ({selectedList.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedList.map(p => (
                <div key={p.id} className="bg-white border px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm text-gray-700 shadow-sm">
                  {/* CORREÇÃO AQUI: p.nomeUsuario */}
                  <span className="font-medium">{p.nomeUsuario}</span>
                  <X size={14} className="cursor-pointer text-red-400 hover:text-red-600" onClick={() => onRemove(p.id)} />
                </div>
              ))}
            </div>
          </div>

          {message && (
            <div className={`alert py-3 rounded-xl border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              <span className="text-sm font-bold text-center w-full">{message.text}</span>
            </div>
          )}

          <button 
            onClick={onSave}
            disabled={isLoading || selectedList.length === 0}
            className="btn btn-block bg-[#2D3748] hover:bg-[#1a202c] text-white border-none rounded-xl h-14 text-lg normal-case"
          >
            {isLoading ? <span className="loading loading-spinner"></span> : 'Confirmar Alocação'}
          </button>
        </div>
      </div>
    </div>
  );
};