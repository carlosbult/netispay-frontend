export type RoleNavigation = Record<
  string,
  {
    mainNav: NavItem[];
    userNav: NavItem[];
  }
>;

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}
