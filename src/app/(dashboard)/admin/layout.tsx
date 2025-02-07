import { BreadcrumbNav } from './_components/BreadcrubNav';

const DashboardAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen flex flex-col">
      <BreadcrumbNav />
      {children}
    </section>
  );
};

export default DashboardAdminLayout;
