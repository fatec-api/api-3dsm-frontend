import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCanAccess } from './useCanAccess';
import type { UserRole } from '../../config/permissions';

export const useRequireRole = (requiredRoles: UserRole | UserRole[], redirectTo = '/acesso-negado') => {
  const navigate = useNavigate();
  const { canAccess } = useCanAccess();

  useEffect(() => {
    if (!canAccess(requiredRoles)) {
      navigate(redirectTo, { replace: true });
    }
  }, [canAccess, requiredRoles, navigate, redirectTo]);
};
