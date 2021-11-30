/* eslint-disable no-return-assign */
import { useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import Table from '../components/shared/Table';
import { getCompanies, resetCompaniesState } from '../store/ducks/companiesDuck';
import { RootState } from '../store/configureStore';
import COLORS from '../services/colors.service';
import useGetData from '../helpers/hooks/useGetData';

const LIMIT = 8;

const Companies = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
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
    </div>
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

const useStyles = createUseStyles({
  root: {
    color: COLORS.blueWood,
    width: '100%',
    padding: '4rem 5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
  },
});
