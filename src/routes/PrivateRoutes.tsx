import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { KeycloakContext } from '../contexts/KeycloakProvider';

export default function PrivateRoute() {
  const { autenticado, login } = useContext(KeycloakContext);

  useEffect(() => {
    if (!autenticado) {
      login();
    }
  }, [autenticado]);

  if (!autenticado) {
    return <div>Redirecionando para login...</div>;
  }

  return <Outlet />;
}
