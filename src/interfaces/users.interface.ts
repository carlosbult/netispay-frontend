export interface User {
  id: number;
  network_manager_user_id?: number;
  name?: string;
  email: string;
  password?: string;
  message?: string;
  token?: string;
  type_of_person?: string;
}

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  ACCOUNTING = 'ACCOUNTING',
}

// Definir una interfaz para los roles
export type RoleRoutes = Record<string, string>;
