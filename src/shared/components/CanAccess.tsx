import { useContext, type ReactNode } from 'react';
import { KeycloakContext } from '../../contexts/KeycloakProvider';

interface CanAccessProps {
  role: string;
  children: ReactNode;
}

export default function CanAccess({ role, children }: CanAccessProps) {
  const { autenticado, temPermissao } = useContext(KeycloakContext);
  if (!autenticado || !temPermissao(role)) {
    return null;
  }
  return <>{children}</>;
}

/* 
 * Exemplo de uso prático nas telas da equipe:
 * <CanAccess role="gestor">
 *   <button>Deletar Cliente</button>
 * </CanAccess>
 */