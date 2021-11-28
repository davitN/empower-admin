/* eslint-disable no-return-assign */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/shared/Table';
import { getCompanies } from '../store/ducks/companiesDuck';
import { RootState } from '../store/configureStore';
import { DataTypes } from '../types/companies';

const Companies = () => {
  const dispatch = useDispatch();
  const companiesList: Array<DataTypes> = useSelector((state: RootState) => state.companiesReducer);

  useEffect(() => {
    dispatch(getCompanies({ offset: 0, limit: 100 }));
  }, []);

  return (
    <div style={{ width: '100%', padding: '0 5rem' }}>
      <Table data={companiesList} header={tableHeaders} />
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
    field: 'userCounts',
  },
];
