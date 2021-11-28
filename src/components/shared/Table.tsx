/* eslint-disable react/destructuring-assignment */
import { createUseStyles } from 'react-jss';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';
import { useState } from 'react';
import classNames from 'classnames';
import COLORS from '../../services/colors.service';
import ButtonComponent from './Inputs/Button';
import Input from './Inputs/TextInput';

interface PropTyoes {
  data: any,
  header: Array<{
    name: string,
    field: string
  }>
  handlePageChange?: (page: number) => void,
  handleEdit?: (data: any) => void,
  handleAdd?: () => void,
}

const Table = ({
  data, header, handlePageChange, handleEdit, handleAdd,
}: PropTyoes) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [value, setValue] = useState<string>('');

  const editAction = (rowData: any) => (
    <ButtonComponent customClasses={classes.actionButton} handleClick={handleEdit ? () => handleEdit(rowData) : undefined}>
      <i className="pi pi-cog" />
    </ButtonComponent>
  );

  const handleChange = ({ first, page }: { first: number, page: number }) => {
    setCurrentPage(first);
    if (handlePageChange) {
      handlePageChange(page);
    }
  };

  return (
    <div className={classes.tableContainer}>
      <div className={classes.header}>
        <Input
          icon={<i className="pi pi-search" />}
          placeholder="Search..."
          value={value}
          handleChange={(val) => setValue(val)}
          customClasses={classes.input}
        />
        <ButtonComponent
          bgColor={COLORS.lightBlue}
          textColor={COLORS.white}
          customClasses={classNames(classes.button, 'p-ml-5')}
          handleClick={handleAdd || undefined}
        >
          + Add User
        </ButtonComponent>
      </div>
      <DataTable
        value={data}
        responsiveLayout="scroll"
        rows={10}
        loading={!data}
        tableClassName={classes.table}
      >
        {header.map(({ name, field }) => <Column field={field} header={name} key={field} />)}
        <Column body={editAction} header="Settings" />
      </DataTable>
      <Paginator
        template="PrevPageLink PageLinks NextPageLink"
        className={classes.paginator}
        first={currentPage}
        rows={10}
        totalRecords={data?.length || 0}
        onPageChange={handleChange}
      />
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
    minHeight: '30rem',
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
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '1rem 0',
    alignItems: 'center',
  },
  input: {
    maxWidth: '16rem',
    '& > input': {
      borderRadius: '1rem',
      paddingTop: '0.5rem !important',
      paddingBottom: '0.5rem !important',
      border: `2px solid ${COLORS.blueWood} !important`,
      color: `${COLORS.blueWood} !important`,
      '&:hover': {
        border: `2px solid ${COLORS.blueWood} !important`,
      },
      '&:focus': {
        boxShadow: 'none !important',
        border: `2px solid ${COLORS.blueWood} !important`,
      },
    },
  },
  button: {
    maxWidth: 'max-content',
    padding: '0.5rem 2rem !important',
  },
});
