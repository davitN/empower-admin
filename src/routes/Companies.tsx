/* eslint-disable no-return-assign */
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Table from '../components/shared/Table';
import { getCompanies, resetCompaniesState } from '../store/ducks/companiesDuck';
import { RootState } from '../store/configureStore';
import useGetData from '../helpers/hooks/useGetData';
import Container from '../components/shared/Container';

const LIMIT = 8;

const Companies = () => {
  const navigate = useNavigate();
  const { companies } = useSelector((state: RootState) => state.companiesReducer);
  const {
    searchValue, handleSearch, handlePageChange,
  } = useGetData({
    getDataAction: getCompanies,
    resetState: resetCompaniesState,
    LIMIT,
    resetOnUnmount: true,
  });

  return (
    <Container sectionTitle="COMPANIES">
      <Table
        searchValue={searchValue || ''}
        handleSearch={(val) => handleSearch(val)}
        data={companies}
        header={tableHeaders}
        tableTitle="COMPANIES"
        handleEdit={({ _id }) => navigate(_id)}
        LIMIT={LIMIT}
        handlePageChange={(val) => handlePageChange(val)}
        handleAdd={() => navigate('new')}
        buttonText="+ Add company"
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
