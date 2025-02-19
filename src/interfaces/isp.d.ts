export type TCommissionType = 'ISP_ASSUMES' | 'CLIENT_ASSUMES';

export interface ICommissionISP {
  id: number;
  name: string;
  email: string;
  rif: string;
  network_manager_id: number;
  is_active: boolean;
  created_at: string; // ISO 8601 date string
  updated_at: string | null;
}

export interface ICommissionISPConfig {
  id: number;
  isp_id: number;
  igtf_rate: number;
  iva_rate: number;
  add_iva_ves: boolean;
  add_iva_usd: boolean;
  add_igtf: boolean;
  commission_type: TCommissionType;
  allow_partial_payment: boolean;
  instance_subdomain: string;
  instance_ip: string;
  instance_token: string;
  admin_software_token: string;
  is_active: boolean;
  created_at: string; // ISO 8601 date string
  updated_at: string | null; // ISO 8601 date string
  isp: ICommissionISP;
}

export interface IISPConfig {
  id: number;
  name: string;
  api_url: string;
  api_key: string;
  isp: IIsp[];
}
