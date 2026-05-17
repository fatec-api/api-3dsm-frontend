export type UserRole = 'GESTOR' | 'FUNCIONARIO' | 'FINANCEIRO' | 'ADMIN';

export interface PermissionMap {
  [page: string]: UserRole[];
}

export const permissions: PermissionMap = {
  'projetos': ['GESTOR', 'FINANCEIRO'],
  'apontamentos': ['FUNCIONARIO', 'GESTOR'],
  'financeiro': ['GESTOR', 'FINANCEIRO'],
  'usuarios': ['GESTOR', 'FINANCEIRO'],
  'relatorios': ['GESTOR', 'FINANCEIRO'],
};

export const checkPermission = (role: UserRole | UserRole[], requiredRoles: UserRole | UserRole[], requireAll = false): boolean => {
  const userRoles = Array.isArray(role) ? role : [role];
  const required = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  if (requireAll) {
    return required.every(r => userRoles.includes(r));
  }
  return required.some(r => userRoles.includes(r));
};
