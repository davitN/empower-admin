import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Table from '../components/shared/Table';
import useGetData from '../helpers/hooks/useGetDataV2';
import { getAppAdmins, resetAppAdminsState, getAppAdminsRoles } from '../store/ducks/appAdminsDuck';
import { RootState } from '../store/configureStore';
import Container from '../components/shared/Container';
import Autocomplete from '../components/shared/Inputs/Autocomplete';
import { AppAdminsRoles } from '../types/appAdmin';

const LIMIT = 8;

const AppAdmins = () => {
  const filters = useSelector((state: RootState) => state.filtersReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState<string | null>(filters?.admins?.roleId || null);
  const { admins } = useSelector((state: RootState) => state.appAdminsReducer);
  const { adminsRoles }: { adminsRoles: AppAdminsRoles[] } = useSelector((state: RootState) => state.appAdminsReducer);
  const {
    params, handleParamsChange, handlePageChange,
  } = useGetData({
    getDataAction: getAppAdmins,
    resetState: resetAppAdminsState,
    LIMIT,
    resetOnUnmount: true,
    tableId: 'admins',
  });

  useEffect(() => {
    dispatch(getAppAdminsRoles());
  }, []);
  return (
    <Container sectionTitle="APP ADMINS LIST">
      <Table
        searchValue={params?.filter || ''}
        tableId="admins"
        saveFilters
        handleSearch={(val) => handleParamsChange({ filter: val })}
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
              selectedValue={(Array.isArray(adminsRoles) && adminsRoles.find((el) => el['_id'] === selectedRole)) || null}
              setSelectedValue={(item: AppAdminsRoles) => {
                setSelectedRole(item['_id']);
                handleParamsChange({ roleId: item['_id'] });
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
