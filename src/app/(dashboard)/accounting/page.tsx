import Balance from './_components/Balance';
import Profile from './_components/Profile';
import Security from './_components/Security';
import SideBar from './_components/SideBar';

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const Component = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  const resolvedSearchParams = await searchParams;
  const section = resolvedSearchParams.section ?? '1';
  return (
    <SideBar pathname={section}>
      {section === 'profile' && <Profile />}
      {section === 'balance' && <Balance />}
      {section === 'security' && <Security />}
    </SideBar>
  );
};
export default Component;
