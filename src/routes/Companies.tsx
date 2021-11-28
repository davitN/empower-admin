/* eslint-disable no-return-assign */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import Table from '../components/shared/Table';
import { getCompanies } from '../store/ducks/companiesDuck';
import { RootState } from '../store/configureStore';
import { DataTypes } from '../types/companies';
import COLORS from '../services/colors.service';

const Companies = () => {
  const dispatch = useDispatch();
  const companiesList: Array<DataTypes> = useSelector((state: RootState) => state.companiesReducer);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getCompanies({ offset: 0, limit: 100 }));
  }, []);

  return (
    <div className={classes.root}>
      <Table data={companiesList} header={tableHeaders} tableTitle="COMPANIES" />
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
