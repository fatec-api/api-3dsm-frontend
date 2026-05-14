import { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { KeycloakContext } from '../contexts/KeycloakProvider';

interface PrivateRouteProps {
  roleRequirida?: string;
}

export default function PrivateRoute({ roleRequirida }: PrivateRouteProps) {
  const { autenticado, login, temPermissao } = useContext(KeycloakContext);

  useEffect(() => {
    if (!autenticado) {
      login();
    }
  }, [autenticado, login]);

  if (!autenticado) {
    return <div>Redirecionando para login...</div>;
  }

  if (roleRequirida && !temPermissao(roleRequirida)) {
    console.warn(`[Security] Acesso negado à rota protegida. Role exigida: ${roleRequirida}`);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}