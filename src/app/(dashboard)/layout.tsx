import { Suspense } from 'react';
import NavBar from 'src/components/NavBar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Header /> */}
      <main className="min-h-screen mx-auto">
        <Suspense>
          <NavBar />
        </Suspense>
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
