/* eslint-disable no-return-assign */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { createUseStyles } from 'react-jss';
import { getCompanies } from '../store/ducks/companiesDuck';
import { RootState } from '../store/configureStore';
import COLORS from '../services/colors.service';
import ButtonComponent from '../components/shared/Inputs/Button';

const Companies = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const companiesList = useSelector((state: RootState) => state.companiesReducer);

  console.log(companiesList);
  useEffect(() => {
    dispatch(getCompanies({ offset: 0, limit: 100 }));
  }, []);

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
  const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
  const editUserRemplate = (rowData: any) => (
  // eslint-disable-next-line no-console
    <ButtonComponent customClasses={classes.actionButton} handleClick={() => console.log(rowData)}><i className="pi pi-cog" /></ButtonComponent>
  );

  return (
    <div className={classes.tableContainer}>
      <DataTable
        value={companiesList}
        paginator
        responsiveLayout="scroll"
        paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        loading={!companiesList}
        className={classes.table}
        tableClassName={classes.table}
      >
        <Column field="name" header="COMPANY" />
        <Column field="code" header="COMPANY ID" />
        <Column field="locations" header="LOCATIONS" />
        <Column field="userCount" header="USERS" />
        <Column body={editUserRemplate} header="Settings" />
      </DataTable>
    </div>
  );
};

export default Companies;

const useStyles = createUseStyles({
  tableContainer: {
    padding: '0 5rem',
    width: '100%',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '& > .p-datatable': {
      width: '100%',
    },
  },
  table: {
    '& > thead > tr > th': {
      background: 'transparent !important',
      color: `${COLORS.blueWood} !important`,
      fontWeight: '600 !important',
      padding: '0.8rem !important',
      border: 'none !important',
      borderBottom: '2px solid #D5D5D5 !important',
      fontSize: '0.9rem',
    },
    '& > tbody > tr > td': {
      background: 'transparent !important',
      color: `${COLORS.blueWood} !important`,
      padding: '0.8rem !important',
      border: 'none !important',
      borderBottom: '2px solid #D5D5D5 !important',
      fontWeight: '400 !important',
    },
    '& > tbody > tr > td:last-child': {
      paddingTop: '0 !important',
      paddingBottom: '0 !important',
    },
  },
  actionButton: {
    background: COLORS.blueWood,
    border: '0 !important',
    width: 'max-content',
    padding: '8px !important',
    '&:hover': {
      background: `${COLORS.blueWood} !important`,
      border: '0 !important',
    },
    '&:active': {
      background: `${COLORS.blueWood} !important`,
      border: '0 !important',
    },
    '&:focus': {
      border: '0 !important',
      boxShadow: 'none !important',
    },
    '& > i': {
      color: COLORS.white,
    },
  },
});
