const DashboardUsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 pt-14 overflow-hidden">{children}</div>
    </section>
  );
};

export default DashboardUsersLayout;
