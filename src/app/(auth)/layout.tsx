import { type ReactNode } from 'react';
import NavBar from 'src/components/NavBar';

const authLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <main className="relative flex min-h-screen flex-col">
      <NavBar />
      <div className="flex-1 flex-grow">{children}</div>
    </main>
  );
};

export default authLayout;
