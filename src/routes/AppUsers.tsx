import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Table from '../components/shared/Table';
import COLORS from '../services/colors.service';
import useGetData from '../helpers/hooks/useGetData';
import { GetAppUsersData } from '../types/appUsers';
import { resetAllAppUsersState, getAllAppUsers } from '../store/ducks/appUsersDuck';
import { RootState } from '../store/configureStore';
import Autocomplete from '../components/shared/Inputs/Autocomplete';
import { CompaniesTypes, CompanyItem } from '../types/companies';
import { getCompanies, resetCompaniesState } from '../store/ducks/companiesDuck';

const LIMIT = 8;

interface AdditionalData {
  _id: string,
  name: string,
  logo?: {
    imgURL: string
  }
}

const AppUsers = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState<null | CompanyItem>(null);
  const { allUsers }: { allUsers: GetAppUsersData | null } = useSelector((state: RootState) => state.appUsersReducer);
  const { companies }: { companies: CompaniesTypes | null } = useSelector((state: RootState) => state.companiesReducer);

  const {
    searchValue, handleSearch, handlePageChange,
  } = useGetData({
    LIMIT,
    resetOnUnmount: true,
    getDataAction: getAllAppUsers,
    resetState: resetAllAppUsersState,
    customParams: { companyId: selectedCompany ? selectedCompany['_id'] : null },
  });

  const {
    handleSearch: companiesHandleSearch,
  } = useGetData({
    LIMIT: 20,
    resetOnUnmount: true,
    getDataAction: getCompanies,
    resetState: resetCompaniesState,
  });

  return (
    <div className={classes.root}>
      <Table
        searchValue={searchValue || ''}
        handleSearch={(val) => handleSearch(val)}
        data={allUsers}
        header={tableHeaders(navigate)}
        tableTitle="USERS"
        handleEdit={({ _id }) => navigate(`/app-users/${_id}`)}
        LIMIT={LIMIT}
        handlePageChange={(val) => handlePageChange(val)}
        customFilters={(
          <div style={{ width: '15rem' }}>
            <Autocomplete
              data={companies?.data}
              getOptionLabel={(option: CompanyItem) => option.name}
              getOptionValue={(option: CompanyItem) => option.name}
              selectedValue={selectedCompany}
              setSelectedValue={setSelectedCompany}
              handleSearch={companiesHandleSearch}
            />
          </div>
        )}
      />
    </div>
  );
};

export default AppUsers;

const tableHeaders = (navigate: any) => [
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
    name: 'COMPANY',
    body: ({ companyId }: { companyId: AdditionalData }) => (
      <div onClick={() => navigate(`/companies/${companyId['_id']}`)} style={{ cursor: 'pointer' }}>
        <p className="p-pb-2">{companyId.name}</p>
        <img style={{ width: '5rem', height: '1.5rem' }} src={companyId?.logo?.imgURL} alt="" />
      </div>
    ),
  },
  {
    name: 'LOCATION',
    body: ({ companyId, location }: { companyId: AdditionalData, location: AdditionalData }) => (
      <div onClick={() => navigate(`/locations/${location['_id']}`)} style={{ cursor: 'pointer' }}>
        <p className="p-pb-2">{location.name}</p>
        <img style={{ width: '5rem', height: '1.5rem' }} src={location?.logo?.imgURL || companyId?.logo?.imgURL} alt="" />
      </div>
    ),
  },
];

const useStyles = createUseStyles({
  root: {
    color: COLORS.blueWood,
    width: '100%',
    padding: '4rem 5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
  },
});
