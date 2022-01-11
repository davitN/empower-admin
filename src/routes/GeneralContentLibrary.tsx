import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Container from '../components/shared/Container';
import {
  getContentItem, getContentsData, resetContentItem, resetContentsData,
} from '../store/ducks/generalContentLibraryDuck';
import useGetData from '../helpers/hooks/useGetData';
import Table from '../components/shared/Table';
import { RootState } from '../store/configureStore';
import { InitialState, GeneralContentLibraryType } from '../types/generalContentLibrary';

const GeneralContentLibrary = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const initialData: InitialState = useSelector((state: RootState) => state.generalContentLibraryReducer);
  const navigate = useNavigate();

  const {
    searchValue: powerUpSearchValue, handleSearch: powerUpHandleSearch, handlePageChange: powerUpHandlePageChange,
  } = useGetData({
    getDataAction: getContentItem,
    resetState: () => resetContentItem('POWER_UP'),
    fetchOnMount: false,
    customParams: {
      type: 'POWER_UP',
    } as { type: GeneralContentLibraryType },
    LIMIT: 5,
  });

  const {
    searchValue: powerDownSearchValue, handleSearch: powerDownHandleSearch, handlePageChange: powerDownHandlePageChange,
  } = useGetData({
    getDataAction: getContentItem,
    resetState: () => resetContentItem('POWER_DOWN'),
    fetchOnMount: false,
    customParams: {
      type: 'POWER_DOWN',
    } as { type: GeneralContentLibraryType },
    LIMIT: 5,
  });

  const {
    searchValue: wellnessSearchValue, handleSearch: wellnessHandleSearch, handlePageChange: wellnessHandlePageChange,
  } = useGetData({
    getDataAction: getContentItem,
    resetState: () => resetContentItem('WELNESS'),
    fetchOnMount: false,
    customParams: {
      type: 'WELNESS',
    } as { type: GeneralContentLibraryType },
    LIMIT: 5,
  });

  const {
    searchValue: ethosSearchValue, handleSearch: ethosHandleSearch, handlePageChange: ethosHandlePageChange,
  } = useGetData({
    getDataAction: getContentItem,
    resetState: () => resetContentItem('ETHOS'),
    fetchOnMount: false,
    customParams: {
      type: 'ETHOS',
    } as { type: GeneralContentLibraryType },
    LIMIT: 5,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    dispatch(getContentsData());
    return () => dispatch(resetContentsData());
  }, []);

  return (
    <Container sectionTitle="GENERAL CONTENT LIBRARY">
      <div className={classNames(classes.wrapper, 'p-px-3')}>
        <Table
          searchValue={powerUpSearchValue}
          handleSearch={(val: string) => powerUpHandleSearch(val)}
          data={initialData.powerUpGeneralContent}
          header={tableHeaders}
          tableTitle="Power&#9679;Up Content"
          handleEdit={({ _id, type }) => navigate(`edit/${_id}?type=${type}`)}
          handleAdd={() => navigate('new/?type=POWER_UP')}
          LIMIT={5}
          handlePageChange={(val) => powerUpHandlePageChange(val)}
          buttonText="+ Add content"
        />
        <Table
          searchValue={powerDownSearchValue}
          handleSearch={(val: string) => powerDownHandleSearch(val)}
          data={initialData.powerDownGeneralContent}
          header={tableHeaders}
          tableTitle="Power&#9679;Down Content"
          handleEdit={({ _id, type }) => navigate(`edit/${_id}?type=${type}`)}
          LIMIT={5}
          handlePageChange={(val) => powerDownHandlePageChange(val)}
        />
        <Table
          searchValue={wellnessSearchValue}
          handleSearch={(val: string) => wellnessHandleSearch(val)}
          data={initialData.welnessGeneralContent}
          header={tableHeaders}
          tableTitle="Wellness Content"
          handleEdit={({ _id, type }) => navigate(`edit/${_id}?type=${type}`)}
          LIMIT={5}
          handlePageChange={(val) => wellnessHandlePageChange(val)}
        />
        <Table
          searchValue={ethosSearchValue}
          handleSearch={(val: string) => ethosHandleSearch(val)}
          data={initialData.ethosGeneralContent}
          header={[{
            name: 'ETHOS TITLE',
            field: 'title',
          }]}
          tableTitle="Ethos Definition"
          handleEdit={({ _id, type }) => navigate(`edit/${_id}?type=${type}`)}
          LIMIT={5}
          handlePageChange={(val) => ethosHandlePageChange(val)}
        />
      </div>
    </Container>
  );
};

export default GeneralContentLibrary;

const useStyles = createUseStyles({
  wrapper: {
    display: 'grid',
    gridGap: '2rem',
  },
});

const tableHeaders = [
  {
    name: 'TITLE',
    field: 'title',
  },
  {
    name: 'CONTENT TYPE',
    field: 'contentType',
  },
];
