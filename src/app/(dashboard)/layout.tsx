import NavBar from 'src/components/NavBar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Header /> */}
      <main className="min-h-screen mx-auto max-w-[1440px]">
        <NavBar />
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
