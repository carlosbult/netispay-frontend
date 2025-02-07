import SideBar from '../_components/SideBar';
import BankConfig from './_components/BankConfig';
import CommissionsConfig from './_components/CommissionsConfig';
import ISPConfigContainer from './_components/ISPConfigContainer';

const ConfiguracionISPPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  const resolvedSearchParams = await searchParams;
  const section = resolvedSearchParams.section ?? 'isp-config';
  const update = resolvedSearchParams.update ?? 'false';
  const ispId = resolvedSearchParams.ispId ?? null;

  return (
    <SideBar pathname={section}>
      {/* {section === 'isp-config' && <ISPConfig update={update === 'true'} />} */}
      {section === 'isp-config' && (
        <ISPConfigContainer update={update === 'true'} ispId={ispId} />
      )}
      {section === 'commissions-config' && <CommissionsConfig />}
      {section === 'bank-config' && <BankConfig />}
    </SideBar>
  );
};

export default ConfiguracionISPPage;
