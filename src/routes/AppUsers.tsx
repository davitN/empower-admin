import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import Table from '../components/shared/Table';
import COLORS from '../services/colors.service';
import useGetData from '../helpers/hooks/useGetData';

const LIMIT = 8;

const Companies = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    searchValue, handleSearch, handlePageChange,
  } = useGetData({
    LIMIT,
    resetOnUnmount: true,
  });

  return (
    <div className={classes.root}>
      <Table
        searchValue={searchValue || ''}
        handleSearch={(val) => handleSearch(val)}
        data={{ data: [], count: 0 }}
        header={tableHeaders}
        tableTitle="USERS"
        handleEdit={({ _id }) => navigate(_id)}
        LIMIT={LIMIT}
        handlePageChange={(val) => handlePageChange(val)}
        handleAdd={() => navigate('new')}
        buttonText="+ Add user"
      />
    </div>
  );
};

export default Companies;

const tableHeaders = [
  {
    name: 'FIRST NAME',
    field: 'name',
  },
  {
    name: 'LAST NAME',
    field: 'code',
  },
  {
    name: 'EMAIL',
    field: 'locationCount',
  },
  {
    name: 'PHONE',
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
