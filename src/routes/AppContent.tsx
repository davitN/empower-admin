import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import {
  getAppContent, resetAppContentState, getCommunityData, getAppContentItem, resetAppContentItem,
} from '../store/ducks/appContentDuck';
import { RootState } from '../store/configureStore';
import { AppContentGetData } from '../types/appContent';
import Container from '../components/shared/Container';
import Title from '../components/shared/Title';
import Table from '../components/shared/Table';
import useGetData from '../helpers/hooks/useGetData';

const AppContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const initialData: AppContentGetData = useSelector((state: RootState) => state.appContentReducer);

  const {
    searchValue: communitySearchValue, handleSearch: communityHandleSearch, handlePageChange: communityHandlePageChange,
  } = useGetData({
    getDataAction: getCommunityData,
    fetchOnMount: false,
  });

  const {
    searchValue: kickOffSearchValue, handleSearch: kickOffHandleSearch, handlePageChange: kickOffHandlePageChange,
  } = useGetData({
    getDataAction: getAppContentItem,
    resetState: () => resetAppContentItem('kickOff'),
    fetchOnMount: false,
    costumeParams: {
      fieldName: 'kickOff',
    },
  });

  const {
    searchValue: ethosSearchValue, handleSearch: ethosHandleSearch, handlePageChange: ethosHandlePageChange,
  } = useGetData({
    getDataAction: getAppContentItem,
    resetState: () => resetAppContentItem('ethos'),
    fetchOnMount: false,
    costumeParams: {
      fieldName: 'ethos',
    },
  });

  const {
    searchValue: gratitudeSearchValue, handleSearch: gratitudeHandleSearch, handlePageChange: gratitudeHandlePageChange,
  } = useGetData({
    getDataAction: getAppContentItem,
    resetState: () => resetAppContentItem('gratitude'),
    fetchOnMount: false,
    costumeParams: {
      fieldName: 'gratitude',
    },
  });

  const {
    searchValue: powerUpSearchValue, handleSearch: powerUpHandleSearch, handlePageChange: powerUpHandlePageChange,
  } = useGetData({
    getDataAction: getAppContentItem,
    resetState: () => resetAppContentItem('powerUp'),
    fetchOnMount: false,
    costumeParams: {
      fieldName: 'powerUp',
    },
  });

  const {
    searchValue: powerDownSearchValue, handleSearch: powerDownHandleSearch, handlePageChange: powerDownHandlePageChange,
  } = useGetData({
    getDataAction: getAppContentItem,
    resetState: () => resetAppContentItem('powerDown'),
    fetchOnMount: false,
    costumeParams: {
      fieldName: 'powerDown',
    },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    dispatch(getAppContent());
    return () => dispatch(resetAppContentState());
  }, []);

  return (
    <Container sectionTitle="EMPOWER APP CONTENT">
      <div className="p-px-3">
        <Title title="MONTHLY COMPANY CONTENT" fontSize="text-2xl" costumeStyles="p-mb-6" />
        <div className={classNames(classes.wrapper, 'p-px-3')}>
          <Table
            searchValue={kickOffSearchValue || ''}
            handleSearch={(val) => kickOffHandleSearch(val)}
            data={initialData.kickOff}
            header={tableHeaders}
            tableTitle="Kickoff Content"
            handleEdit={({ _id }) => navigate(_id)}
            handlePageChange={(val) => kickOffHandlePageChange(val)}
            handleAdd={() => navigate('new')}
            buttonText="+ Add content"
          />
          <Table
            searchValue={ethosSearchValue || ''}
            handleSearch={(val) => ethosHandleSearch(val)}
            data={initialData.ethos}
            header={tableHeaders}
            tableTitle="Ethos Content"
            handleEdit={({ _id }) => navigate(_id)}
            handlePageChange={(val) => ethosHandlePageChange(val)}
            handleAdd={() => navigate('new')}
            buttonText="+ Add content"
          />
          <Table
            searchValue={gratitudeSearchValue || ''}
            handleSearch={(val) => gratitudeHandleSearch(val)}
            data={initialData.gratitude}
            header={tableHeaders}
            tableTitle="Gratitude Content"
            handleEdit={({ _id }) => navigate(_id)}
            handlePageChange={(val) => gratitudeHandlePageChange(val)}
            handleAdd={() => navigate('new')}
            buttonText="+ Add content"
          />
          <Table
            searchValue={powerUpSearchValue || ''}
            handleSearch={(val) => powerUpHandleSearch(val)}
            data={initialData.powerUp}
            header={tableHeaders}
            tableTitle="Power-Up Content"
            handleEdit={({ _id }) => navigate(_id)}
            handlePageChange={(val) => powerUpHandlePageChange(val)}
            handleAdd={() => navigate('new')}
            buttonText="+ Add content"
          />
          <Table
            searchValue={powerDownSearchValue || ''}
            handleSearch={(val) => powerDownHandleSearch(val)}
            data={initialData.powerDown}
            header={tableHeaders}
            tableTitle="Power-Down Content"
            handleEdit={({ _id }) => navigate(_id)}
            handlePageChange={(val) => powerDownHandlePageChange(val)}
            handleAdd={() => navigate('new')}
            buttonText="+ Add content"
          />
          <Title title="COMMUNITY CONTENT" fontSize="text-2xl" costumeStyles="p-mb-6" />
          <Table
            searchValue={communitySearchValue || ''}
            handleSearch={(val) => communityHandleSearch(val)}
            data={initialData.communityData}
            header={communityDataHeader}
            tableTitle="Community Content"
            handleEdit={({ _id }) => navigate(_id)}
            handlePageChange={(val) => communityHandlePageChange(val)}
            handleAdd={() => navigate('new')}
            buttonText="+ Add content"
          />
        </div>
      </div>
    </Container>
  );
};

export default AppContent;

const useStyles = createUseStyles({
  wrapper: {
    display: 'grid',
    gridGap: '2rem',
  },
});

const tableHeaders = [
  {
    name: 'CONTENT TITLE',
    field: 'title',
  },
  {
    name: 'CONTENT TYPE',
    field: 'type',
  },
  {
    name: 'START DATE/TIME',
    field: 'startDate',
  },
  {
    name: 'END DATE/TIME',
    field: 'endDate',
  },
  {
    name: 'COMPANY',
    field: 'company.name',
  },
];

const communityDataHeader = [
  {
    name: 'CONTENT TITLE',
    field: 'title',
  },
  {
    name: 'PUBLISHED',
    field: 'createdAt',
  },
  {
    name: 'CATEGORY',
    field: 'category.name',
  },
];
