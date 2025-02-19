export interface UserQueryParams {
  id?: number;
  name?: string;
  dni?: number;
  city?: string;
  role?: string;
  page: number;
  pageSize: number;
}

// export interface UserResponse {
//   id: number;
//   email: string;
//   is_active: boolean;
//   role: string;
//   created_at: string;
// }

export interface UsersListResponse {
  users: UserResponse[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}

export interface UserConfiguration {
  id: number;
  client_profile_id: number;
  transaction_limit: number | null;
  notification_preference: string | null;
  is_active: boolean;
}

export interface ClientProfile {
  id: number;
  network_manager_user_id: number;
  user_id: number;
  isp_id: number;
  name: string;
  dni: string;
  phone: string;
  address: string;
  type_of_person: string;
  client_balance: IClientBalance[];
  configuration: UserConfiguration[];
  isp: {
    network_manager: {
      name: string;
    };
  };
}

export interface UserResponse {
  id: number;
  email: string;
  role: string;
  is_authenticated: boolean;
  last_login: string | null;
  is_active: boolean;
  is_deleted: boolean;
  client_profile: ClientProfile;
}

export interface IClientBalance {
  id: number;
  initial_amount: number;
  current_amount: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUser {
  id: number;
  email: string;
  role: string;
  is_authenticated: boolean;
  last_login: Date | null;
  is_active: boolean;
  is_deleted: boolean;
  client_profile: ClientProfile;
}
