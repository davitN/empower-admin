/* eslint-disable no-return-assign */
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Table from '../components/shared/Table';
import { getCompanies, resetCompaniesState } from '../store/ducks/companiesDuck';
import { RootState } from '../store/configureStore';
import useGetData from '../helpers/hooks/useGetDataV2';
import Container from '../components/shared/Container';

const Companies = () => {
  const navigate = useNavigate();
  const { companies } = useSelector((state: RootState) => state.companiesReducer);
  const {
    params, handleParamsChange, handlePageChange,
  } = useGetData({
    getDataAction: getCompanies,
    resetState: resetCompaniesState,
    tableId: 'company',
  });

  return (
    <Container sectionTitle="COMPANIES">
      <Table
        searchValue={params?.filter || ''}
        handleSearch={(val) => handleParamsChange({ filter: val })}
        data={companies}
        header={tableHeaders}
        tableTitle="COMPANIES"
        handleEdit={({ _id }) => navigate(`${_id}`)}
        handlePageChange={(val) => handlePageChange(val)}
        handleAdd={() => navigate('new')}
        buttonText="+ Add company"
        savePagination
        tableId="company"
      />
    </Container>
  );
};

export default Companies;

const tableHeaders = [
  {
    name: 'COMPANY',
    field: 'name',
  },
  {
    name: 'COMPANY ID',
    field: 'code',
  },
  {
    name: 'LOCATIONS',
    field: 'locationCount',
  },
  {
    name: 'USERS',
    field: 'userCount',
  },
];
