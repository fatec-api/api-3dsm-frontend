import { createContext, useState, useEffect, type ReactNode } from 'react';
import keycloak from '../config/keycloakConfig';

export interface UsuarioPerfil {
  nome: string;
  email: string;
  id?: string;
}

interface KeycloakContextType {
  autenticado: boolean;
  login: () => void;
  logout: () => void;
  getToken: () => string | undefined;
  temPermissao: (role: string) => boolean;
  getUsuario: () => UsuarioPerfil | null;
}

export const KeycloakContext = createContext<KeycloakContextType>({} as KeycloakContextType);

interface KeycloakProviderProps {
  children: ReactNode;
}

export const KeycloakProvider = ({ children }: KeycloakProviderProps) => {
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    keycloak.init({ onLoad: 'check-sso', checkLoginIframe: false })
      .then((auth: boolean) => {
        setAutenticado(auth);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("[Keycloak] Erro na inicialização do serviço de autenticação:", err);
        setCarregando(false);
      });

    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).catch(() => keycloak.logout());
    };
  }, []);

  const login = () => { keycloak.login(); };
  const logout = () => { keycloak.logout(); };
  const getToken = (): string | undefined => keycloak.token;
  
  const temPermissao = (role: string): boolean => {
    if (!keycloak.tokenParsed) return false;

    const realmRoles: string[] = keycloak.tokenParsed.realm_access?.roles || [];
    const resourceAccess = keycloak.tokenParsed.resource_access || {};
    const clientRoles = Object.values(resourceAccess).flatMap(
      (resource: any) => resource.roles || []
    );

    const todasAsRoles = [...realmRoles, ...clientRoles];

    return todasAsRoles.some(
      (r) => r.toLowerCase() === role.toLowerCase()
    );
  };
  
  const getUsuario = (): UsuarioPerfil | null => {
    if (!autenticado || !keycloak.tokenParsed) return null;
    
    return {
      nome: (keycloak.tokenParsed.name || keycloak.tokenParsed.preferred_username) as string,
      email: keycloak.tokenParsed.email as string,
      id: keycloak.tokenParsed.sub as string
    };
  };

  if (carregando) {
    return <div>Conectando ao servidor de segurança...</div>;
  }

  return (
    <KeycloakContext.Provider value={{ 
      autenticado, login, logout, getToken, temPermissao, getUsuario 
    }}>
      {children}
    </KeycloakContext.Provider>
  );
};