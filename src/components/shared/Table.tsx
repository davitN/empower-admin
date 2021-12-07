/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUseStyles } from 'react-jss';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
import classNames from 'classnames';
import { useState } from 'react';
import COLORS from '../../services/colors.service';
import ButtonComponent from './Inputs/Button';
import Input from './Inputs/TextInput';
import Title from './Title';

interface PropTypes {
  data: any,
  header: Array<{
    name: string,
    field: string
  }>
  handlePageChange?: (page: number) => void,
  handleEdit?: (data: any) => void,
  handleAdd?: () => void,
  tableTitle?: string,
  handleSearch?: (keyword: string) => void,
  searchValue: string,
  LIMIT?: number,
  buttonText: string,
  costumeClasses?: string
}

const Table = ({
  data, header, handlePageChange, handleEdit, handleAdd, tableTitle, handleSearch, searchValue, LIMIT = 10, buttonText, costumeClasses,
}: PropTypes) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const editAction = (rowData: any) => (
    <ButtonComponent customClasses={classes.actionButton} handleClick={handleEdit ? () => handleEdit(rowData) : undefined}>
      <i className="pi pi-cog" />
    </ButtonComponent>
  );

  const handleChange = (val: any) => {
    setCurrentPage(val.first);
    handlePageChange && handlePageChange(val.page + 1);
  };

  return (
    <div className={classNames(classes.tableContainer, costumeClasses)}>
      <div className={classes.header}>
        {tableTitle && <Title title={tableTitle} fontSize="text-xl" />}
        <div className={classNames(classes.wrapper, 'p-ml-4')}>
          <Input
            icon={<i className="pi pi-search" />}
            placeholder="Search..."
            value={searchValue}
            handleChange={(val) => {
              if (handleSearch) {
                handleSearch(val);
                setCurrentPage(0);
              }
            }}
            customClasses={classes.input}
          />
          <ButtonComponent
            bgColor={COLORS.lightBlue}
            textColor={COLORS.white}
            customClasses={classNames(classes.button, 'p-ml-5')}
            handleClick={handleAdd || undefined}
          >
            {buttonText}
          </ButtonComponent>
        </div>
      </div>
      <DataTable
        value={(data?.data || new Array(10).fill(0))}
        responsiveLayout="scroll"
        rows={LIMIT}
        tableClassName={classes.table}
        emptyMessage="Data not found..."
      >
        {data && header.map(({ name, field }) => <Column field={field} header={name} key={field} />)}
        {!data && header.map(({ name, field }) => <Column field={field} header={name} key={field} body={<Skeleton />} />)}
        <Column body={data ? editAction : <Skeleton />} header="Settings" />
      </DataTable>
      {data && data.data.length > 0 && (
        <Paginator
          template="PrevPageLink PageLinks NextPageLink"
          first={currentPage}
          className={classes.paginator}
          rows={LIMIT}
          // wait for api to add total record num
          totalRecords={data.count}
          onPageChange={handleChange}
        />
      )}
    </div>
  );
};

export default Table;

const useStyles = createUseStyles({
  tableContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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
      textAlign: 'center',
    },
    '& > tbody > .p-datatable-emptymessage > td': {
      height: '10rem',
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
    margin: '1rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
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
