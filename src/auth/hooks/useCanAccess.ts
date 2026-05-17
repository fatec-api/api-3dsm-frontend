import { useContext } from 'react';
import { KeycloakContext } from '../../contexts/KeycloakProvider';
import type { UserRole } from '../../config/permissions';

export const useCanAccess = () => {
  const context = useContext(KeycloakContext);

  if (!context) {
    throw new Error('useCanAccess deve ser usado dentro de KeycloakProvider');
  }

  const canAccess = (requiredRoles: UserRole | UserRole[], requireAll = false): boolean => {
    return context.temPermissao(requiredRoles as string, requireAll);
  };

  return { canAccess, isAuthenticated: context.autenticado };
};
