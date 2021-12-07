import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import {
  getAppContent, resetAppContentState, getCommunityData, resetCommunityData,
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
    searchValue, handleSearch, handlePageChange,
  } = useGetData({
    resetOnUnmount: true,
  });

  const {
    searchValue: communitySearchValue, handleSearch: communityHandleSearch, handlePageChange: communityHandlePageChange,
  } = useGetData({
    getDataAction: getCommunityData,
    resetState: resetCommunityData,
    fetchOnMount: false,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    dispatch(getAppContent());
    return () => dispatch(resetAppContentState());
  }, []);

  return (
    <Container sectionTitle="EMPOWER APP CONTENT">
      <Title title="MONTHLY COMPANY CONTENT" fontSize="text-2xl" />
      <div className={classes.wrapper}>
        <Table
          searchValue={searchValue || ''}
          handleSearch={(val) => handleSearch(val)}
          data={initialData.kickOff}
          header={tableHeaders}
          tableTitle="Kickoff Content"
          handleEdit={({ _id }) => navigate(_id)}
          handlePageChange={(val) => handlePageChange(val)}
          handleAdd={() => navigate('new')}
          buttonText="+ Add content"
        />
        <Table
          searchValue={searchValue || ''}
          handleSearch={(val) => handleSearch(val)}
          data={initialData.ethos}
          header={tableHeaders}
          tableTitle="Ethos Content"
          handleEdit={({ _id }) => navigate(_id)}
          handlePageChange={(val) => handlePageChange(val)}
          handleAdd={() => navigate('new')}
          buttonText="+ Add content"
        />
        <Table
          searchValue={searchValue || ''}
          handleSearch={(val) => handleSearch(val)}
          data={initialData.gratitude}
          header={tableHeaders}
          tableTitle="Gratitude Content"
          handleEdit={({ _id }) => navigate(_id)}
          handlePageChange={(val) => handlePageChange(val)}
          handleAdd={() => navigate('new')}
          buttonText="+ Add content"
        />
        <Table
          searchValue={searchValue || ''}
          handleSearch={(val) => handleSearch(val)}
          data={initialData.powerUp}
          header={tableHeaders}
          tableTitle="Power-Up Content"
          handleEdit={({ _id }) => navigate(_id)}
          handlePageChange={(val) => handlePageChange(val)}
          handleAdd={() => navigate('new')}
          buttonText="+ Add content"
        />
        <Table
          searchValue={searchValue || ''}
          handleSearch={(val) => handleSearch(val)}
          data={initialData.powerDown}
          header={tableHeaders}
          tableTitle="Power-Down Content"
          handleEdit={({ _id }) => navigate(_id)}
          handlePageChange={(val) => handlePageChange(val)}
          handleAdd={() => navigate('new')}
          buttonText="+ Add content"
        />
        <Title title="COMMUNITY CONTENT" fontSize="text-2xl" />
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
