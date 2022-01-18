import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Table from '../components/shared/Table';
import useGetData from '../helpers/hooks/useGetData';
import { getAppAdmins, resetAppAdminsState, getAppAdminsRoles } from '../store/ducks/appAdminsDuck';
import { RootState } from '../store/configureStore';
import Container from '../components/shared/Container';
import Autocomplete from '../components/shared/Inputs/Autocomplete';
import { AppAdminsRoles } from '../types/appAdmin';

const LIMIT = 8;

const AppAdmins = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState<AppAdminsRoles | null>(null);
  const { admins } = useSelector((state: RootState) => state.appAdminsReducer);
  const { adminsRoles } = useSelector((state: RootState) => state.appAdminsReducer);
  const {
    searchValue, handleSearch, handlePageChange, setDynamicParams,
  } = useGetData({
    getDataAction: getAppAdmins,
    resetState: resetAppAdminsState,
    LIMIT,
    resetOnUnmount: true,
  });

  useEffect(() => {
    dispatch(getAppAdminsRoles());
  }, []);

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
        customFilters={(
          <div style={{ width: '15rem' }} className="p-mx-4">
            <Autocomplete
              data={adminsRoles}
              placeholder="Select role"
              getOptionLabel={(option: AppAdminsRoles) => option.name}
              getOptionValue={(option: AppAdminsRoles) => option.name}
              selectedValue={selectedRole}
              setSelectedValue={(item: AppAdminsRoles) => {
                setSelectedRole(item);
                setDynamicParams({ roleId: item['_id'] });
              }}
            />
          </div>

        )}
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
