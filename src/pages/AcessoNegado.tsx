import { useNavigate } from 'react-router-dom';

export const AcessoNegado = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-red-100">
            <svg
              className="w-16 h-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Acesso Negado</h1>
        <p className="text-lg text-gray-600 mb-8">
          Desculpe, você não tem permissão para acessar esta página.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Se acredita que é um erro, entre em contato com o administrador do sistema.
          </p>

          <button
            onClick={() => navigate('/')}
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    </div>
  );
};
