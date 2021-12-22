import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Table from '../components/shared/Table';
import useGetData from '../helpers/hooks/useGetData';
import { getAppAdmins, resetAppAdminsState } from '../store/ducks/appAdminsDuck';
import { RootState } from '../store/configureStore';
import Container from '../components/shared/Container';

const LIMIT = 8;

const AppAdmins = () => {
  const navigate = useNavigate();
  const { admins } = useSelector((state: RootState) => state.appAdminsReducer);
  const {
    searchValue, handleSearch, handlePageChange,
  } = useGetData({
    getDataAction: getAppAdmins,
    resetState: resetAppAdminsState,
    LIMIT,
    resetOnUnmount: true,
  });

  return (
    <Container sectionTitle="APP ADMINS LIST">
      <Table
        searchValue={searchValue || ''}
        handleSearch={(val) => handleSearch(val)}
        data={admins}
        header={tableHeaders}
        tableTitle="ADMINS"
        handleEdit={({ _id, role }) => navigate(`${role.name}/${_id}`)}
        LIMIT={LIMIT}
        handlePageChange={(val) => handlePageChange(val)}
        handleAdd={() => navigate('SuperAdmin/new')}
        buttonText="+ Add admin"
      />
    </Container>
  );
};

export default AppAdmins;

const tableHeaders = [
  {
    name: 'FIRST NAME',
    field: 'firstName',
  },
  {
    name: 'LAST NAME',
    field: 'lastName',
  },
  {
    name: 'EMAIL',
    field: 'email',
  },
  {
    name: 'PHONE',
    field: 'phone',
  },
  {
    name: 'ROLE',
    field: 'role.name',
  },
];
