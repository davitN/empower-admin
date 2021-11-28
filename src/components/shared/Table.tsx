/* eslint-disable react/destructuring-assignment */
import { createUseStyles } from 'react-jss';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';
import { useState } from 'react';
import COLORS from '../../services/colors.service';
import ButtonComponent from './Inputs/Button';

interface PropTyoes {
  data: any,
  header: Array<{
    name: string,
    field: string
  }>
}

const Table = ({ data, header }: PropTyoes) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const editAction = (rowData: any) => (
    <ButtonComponent customClasses={classes.actionButton} handleClick={() => console.log(rowData)}><i className="pi pi-cog" /></ButtonComponent>
  );

  const handlePageChange = (e: any) => {
    setCurrentPage(e.first);
  };
  return (
    <div className={classes.tableContainer}>
      <DataTable
        value={data}
        responsiveLayout="scroll"
        rows={10}
        loading={!data}
        tableClassName={classes.table}
      >
        {header.map(({ name, field }) => <Column field={field} header={name} />)}
        <Column body={editAction} header="Settings" />
      </DataTable>
      <Paginator template="PrevPageLink PageLinks NextPageLink" className={classes.paginator} first={currentPage} rows={10} totalRecords={120} onPageChange={handlePageChange} />
    </div>
  );
};

export default Table;

const useStyles = createUseStyles({
  tableContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '& > .p-datatable ': {
      width: '100%',
    },
  },
  table: {
    '& > thead > tr > th': {
      background: 'transparent !important',
      color: `${COLORS.blueWood} !important`,
      fontWeight: '600 !important',
      padding: '0.8rem 0.8rem 0.8rem 0 !important',
      border: 'none !important',
      borderBottom: '2px solid #D5D5D5 !important',
      fontSize: '0.9rem',
    },
    '& > tbody > tr > td': {
      background: 'transparent !important',
      color: `${COLORS.blueWood} !important`,
      padding: '0.8rem 0.8rem 0.8rem 0 !important',
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
  paginator: {
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
    '& > .p-highlight': {
      fontWeight: '700 !important',
    },
    '& > .p-paginator-pages': {
      border: '0 !important',
      '& > button': {
        background: 'transparent !important',
        color: `${COLORS.blueWood} !important`,
        width: 'max-content !important',
        height: 'max-content !important',
      },
      '& > button:focus': {
        boxShadow: 'none !important',
      },
      '& > .p-highlight': {
        fontWeight: '700 !important',
      },
    },
  },
});
