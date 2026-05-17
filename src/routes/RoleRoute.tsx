import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { KeycloakContext } from '../contexts/KeycloakProvider';
import type { UserRole } from '../config/permissions';

interface RoleRouteProps {
  roles: UserRole | UserRole[];
}

export default function RoleRoute({ roles }: RoleRouteProps) {
  const { autenticado, temPermissao } = useContext(KeycloakContext);

  if (!autenticado || !temPermissao(roles)) {
    return <Navigate to="/acesso-negado" replace />;
  }

  return <Outlet />;
}
