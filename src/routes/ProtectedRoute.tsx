import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useCanAccess } from '../auth/hooks/useCanAccess';
import type { UserRole } from '../config/permissions';

interface ProtectedRouteProps {
  element: ReactNode;
  requiredRoles: UserRole | UserRole[];
  redirectTo?: string;
  requireAll?: boolean;
}

export const ProtectedRoute = ({
  element,
  requiredRoles,
  redirectTo = '/acesso-negado',
  requireAll = false,
}: ProtectedRouteProps) => {
  const { canAccess, isAuthenticated } = useCanAccess();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = canAccess(requiredRoles, requireAll);

  if (!hasAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{element}</>;
};
