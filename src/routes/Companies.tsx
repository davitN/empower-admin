/* eslint-disable no-return-assign */
import { useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import Table from '../components/shared/Table';
import { getCompanies, resetCompaniesState } from '../store/ducks/companiesDuck';
import { RootState } from '../store/configureStore';
import COLORS from '../services/colors.service';
import useGetData from '../components/shared/hooks/useGetData';

const Companies = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { companies } = useSelector((state: RootState) => state.companiesReducer);
  const { searchValue, handleSearch } = useGetData({
    getDataAction: getCompanies,
    resetState: resetCompaniesState,
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
    field: 'locations',
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
