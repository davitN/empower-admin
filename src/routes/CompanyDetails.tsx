import { useParams } from 'react-router-dom';

const CompanyDetails = () => {
  const { id: companyId } = useParams();
  return (
    <p>
      Comp Detail:
      {companyId}
    </p>
  );
};

export default CompanyDetails;
