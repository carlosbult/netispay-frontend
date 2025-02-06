import ISPConfig from './ISPConfig';
import ISPConfigSelector from './ISPConfigSelector';

interface ISPConfigContainerProps {
  update: boolean;
  ispId: string | null;
}

const ISPConfigContainer = (props: ISPConfigContainerProps) => {
  const { update, ispId } = props;
  if (ispId != null) {
    return <ISPConfig update={update} id={ispId} />;
  }
  return <ISPConfigSelector />;
};

export default ISPConfigContainer;
