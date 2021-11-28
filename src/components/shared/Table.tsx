/* eslint-disable react/no-unstable-nested-components */
import { createUseStyles } from 'react-jss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React from 'react';
import COLORS from '../../services/colors.service';
import ButtonComponent from './Inputs/Button';

const Table = ({ data }: { data: any }) => {
  const classes = useStyles();

  const editAction = (rowData: any) => (
    <ButtonComponent customClasses={classes.actionButton} handleClick={() => console.log(rowData)}><i className="pi pi-cog" /></ButtonComponent>
  );

  return (
    <div className={classes.tableContainer}>
      <DataTable
        value={data}
        paginator
        responsiveLayout="scroll"
        paginatorTemplate="RowsPerPageDropdown PrevPageLink PageLinks NextPageLink"
        rows={10}
        loading={!data}
        tableClassName={classes.table}
      >
        <Column field="name" header="COMPANY" />
        <Column field="code" header="COMPANY ID" />
        <Column field="locations" header="LOCATIONS" />
        <Column field="userCount" header="USERS" />
        <Column body={editAction} header="Settings" />
      </DataTable>
    </div>
  );
};

export default Table;

const useStyles = createUseStyles({
  tableContainer: {
    width: '100%',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '& > .p-datatable ': {
      width: '100%',
    },
    '& > .p-datatable > .p-paginator': {
      border: '0 !important',
      marginTop: '1rem',
      '& > button': {
        background: 'transparent !important',
        color: `${COLORS.blueWood} !important`,
        width: 'max-content !important',
        height: 'max-content !important',
      },
      '& > button:focus': {
        boxShadow: 'none !important',
      },
      '& > .p-paginator-pages': {
        '& > button': {
          background: 'transparent !important',
          color: `${COLORS.blueWood} !important`,
          width: 'max-content !important',
          height: 'max-content !important',
        },
        '& > .p-highlight': {
          fontWeight: '700 !important',
        },
        '& > button:focus': {
          boxShadow: 'none !important',
        },
      },
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
