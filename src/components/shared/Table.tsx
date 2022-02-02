/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUseStyles } from 'react-jss';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import COLORS from '../../services/colors.service';
import ButtonComponent from './Inputs/Button';
import Input from './Inputs/TextInput';
import Title from './Title';

interface PropTypes {
  data: any,
  header: Array<{
    name: string,
    field?: string,
    body?: (val: any) => any
  }>
  handlePageChange?: (page: number) => void,
  handleEdit?: (data: any) => void,
  handleAdd?: () => void,
  tableTitle?: string,
  handleSearch?: (keyword: string) => void,
  searchValue: string | null,
  LIMIT?: number,
  buttonText?: string,
  costumeClasses?: string,
  customFilters?: ReactNode
}

const Table = ({
  data,
  header,
  handlePageChange,
  handleEdit,
  handleAdd,
  tableTitle,
  handleSearch,
  searchValue = '',
  LIMIT = 10,
  buttonText,
  costumeClasses,
  customFilters,
}: PropTypes) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const editAction = (rowData: any) => (
    <ButtonComponent customClasses={classNames(classes.actionButton, 'p-ml-auto')} handleClick={handleEdit ? () => handleEdit(rowData) : undefined}>
      <i className="pi pi-cog" style={{ color: COLORS.white }} />
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
          {handleSearch && (
          <Input
            icon={<i className="pi pi-search" />}
            placeholder="Search..."
            value={searchValue || ''}
            handleChange={(val) => {
              if (handleSearch) {
                handleSearch(val);
                setCurrentPage(0);
              }
            }}
            customClasses={classes.input}
          />
          )}
          {customFilters}
          {(handleAdd && buttonText) && (
          <ButtonComponent
            bgColor={COLORS.lightBlue}
            textColor={COLORS.white}
            customClasses={classNames(classes.button, 'p-ml-5')}
            handleClick={handleAdd || undefined}
          >
            {buttonText}
          </ButtonComponent>
          )}
        </div>
      </div>
      <DataTable
        value={(data?.data || new Array(10).fill(0))}
        responsiveLayout="scroll"
        rows={LIMIT}
        tableClassName={classes.table}
        emptyMessage="Data not found..."
      >
        {data && header.map(({ name, field, body }) => <Column field={field} header={name} key={name} body={body} />)}
        {!data && header.map(({ name, field }) => <Column field={field} header={name} key={name} body={<Skeleton />} />)}
        <Column body={data ? editAction : <Skeleton />} header="Settings" className={classes.setting} />
      </DataTable>
      {handlePageChange && data && data?.data?.length > 0 && LIMIT < data.count && (
        <Paginator
          template={(template as any) || undefined}
          first={currentPage}
          className={classes.paginator}
          rows={LIMIT}
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
    '& > thead > tr': {
      background: 'transparent !important',
    },
    '& > tbody > tr': {
      background: 'transparent !important',
    },
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
    width: 'max-content',
    padding: '0.5rem 3rem !important',
    margin: 'auto',
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
      display: 'grid',
      gridAutoFlow: 'column',
      gridColumnGap: '0.5rem',
      margin: '0 1rem',
      '& > button': {
        background: 'transparent !important',
        color: `${COLORS.blueWood} !important`,
        width: 'max-content !important',
        height: 'max-content !important',
        boxShadow: 'none',
        opacity: 0.7,
        fontWeight: 400,
        padding: '0.5rem 0.1rem !important',
        borderRadius: '20% !important',
        minWidth: '2rem !important',
        margin: '0 !important',
        '&:hover:not(.p-highlight)': {
          backgroundColor: 'rgba(119, 200, 204, 0.2) !important',
        },
      },
      '& > button:focus': {
        boxShadow: 'none !important',
      },
      '& > .p-highlight': {
        fontWeight: '500 !important',
        backgroundColor: 'rgba(119, 200, 204, 0.6) !important',
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
    minWidth: '15rem',
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
  setting: {
    '& > div': {
      justifyContent: 'end',
    },
  },
});

const template = {
  layout: 'PrevPageLink PageLinks NextPageLink',
  PrevPageLink: ({ onClick, disabled }: { onClick: () => void, disabled: boolean }) => {
    return <i className="pi pi-angle-double-left" onClick={onClick} style={{ opacity: (disabled && 0.5) || 1, cursor: 'pointer' }} />;
  },
  NextPageLink: ({ onClick, disabled }: { onClick: () => void, disabled: boolean }) => {
    return <i className={classNames('pi pi-angle-double-right')} style={{ opacity: (disabled && 0.5) || 1, cursor: 'pointer' }} onClick={onClick} />;
  },
};
