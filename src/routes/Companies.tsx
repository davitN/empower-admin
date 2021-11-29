/* eslint-disable no-return-assign */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import Table from '../components/shared/Table';
import { getCompanies } from '../store/ducks/companiesDuck';
import { RootState } from '../store/configureStore';
import COLORS from '../services/colors.service';

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companies } = useSelector((state: RootState) => state.companiesReducer);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getCompanies({ offset: 0, limit: 10 }));
  }, []);

  return (
    <div className={classes.root}>
      <Table data={companies} header={tableHeaders} tableTitle="COMPANIES" handleEdit={({ _id }) => navigate(_id)} />
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
