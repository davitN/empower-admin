import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import {
  getAppContent, resetAppContentState, getCommunityData, getAppContentItem, resetAppContentItem, resetCommunityData,
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
    resetState: () => resetCommunityData(),
    LIMIT: 5,
  });

  const {
    searchValue: kickOffSearchValue, handleSearch: kickOffHandleSearch, handlePageChange: kickOffHandlePageChange,
  } = useGetData({
    getDataAction: getAppContentItem,
    resetState: () => resetAppContentItem('kickOff'),
    fetchOnMount: false,
    queryParams: {
      fieldName: 'kickOff',
    },
    LIMIT: 5,
  });

  const {
    searchValue: ethosSearchValue, handleSearch: ethosHandleSearch, handlePageChange: ethosHandlePageChange,
  } = useGetData({
    getDataAction: getAppContentItem,
    resetState: () => resetAppContentItem('ethos'),
    fetchOnMount: false,
    queryParams: {
      fieldName: 'ethos',
    },
    LIMIT: 5,
  });

  const {
    searchValue: gratitudeSearchValue, handleSearch: gratitudeHandleSearch, handlePageChange: gratitudeHandlePageChange,
  } = useGetData({
    getDataAction: getAppContentItem,
    resetState: () => resetAppContentItem('gratitude'),
    fetchOnMount: false,
    queryParams: {
      fieldName: 'gratitude',
    },
    LIMIT: 5,
  });

  const {
    searchValue: powerUpSearchValue, handleSearch: powerUpHandleSearch, handlePageChange: powerUpHandlePageChange,
  } = useGetData({
    getDataAction: getAppContentItem,
    resetState: () => resetAppContentItem('powerUp'),
    fetchOnMount: false,
    queryParams: {
      fieldName: 'powerUp',
    },
    LIMIT: 5,
  });

  const {
    searchValue: powerDownSearchValue, handleSearch: powerDownHandleSearch, handlePageChange: powerDownHandlePageChange,
  } = useGetData({
    getDataAction: getAppContentItem,
    resetState: () => resetAppContentItem('powerDown'),
    fetchOnMount: false,
    queryParams: {
      fieldName: 'powerDown',
    },
    LIMIT: 5,
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
        <Title title="MONTHLY COMPANY CONTENT" fontSize="text-2xl" costumeStyles="p-mt-6" />
        <div className={classNames(classes.wrapper, 'p-px-3')}>
          <Table
            searchValue={kickOffSearchValue}
            handleSearch={(val) => kickOffHandleSearch(val)}
            data={initialData.kickOff}
            header={tableHeaders(navigate)}
            tableTitle="Kickoff Content"
            handleEdit={({ company }) => navigate(`monthly-team-activity/edit/${company['_id']}?fieldName=kickOff`)}
            LIMIT={5}
            handleAdd={() => navigate('/companies')}
            buttonText="+ Add content"
            handlePageChange={(val) => kickOffHandlePageChange(val)}
          />
          <Table
            searchValue={ethosSearchValue}
            handleSearch={(val) => ethosHandleSearch(val)}
            data={initialData.ethos}
            header={tableHeaders(navigate)}
            tableTitle="Ethos Content"
            handleEdit={({ company }) => navigate(`monthly-team-activity/edit/${company['_id']}?fieldName=ethos`)}
            LIMIT={5}
            handleAdd={() => navigate('/companies')}
            buttonText="+ Add content"
            handlePageChange={(val) => ethosHandlePageChange(val)}
          />
          <Table
            searchValue={gratitudeSearchValue}
            handleSearch={(val) => gratitudeHandleSearch(val)}
            data={initialData.gratitude}
            header={tableHeaders(navigate)}
            tableTitle="Gratitude Content"
            handleEdit={({ company }) => navigate(`monthly-team-activity/edit/${company['_id']}?fieldName=gratitude`)}
            LIMIT={5}
            handleAdd={() => navigate('/companies')}
            buttonText="+ Add content"
            handlePageChange={(val) => gratitudeHandlePageChange(val)}
          />
          <Table
            searchValue={powerUpSearchValue}
            handleSearch={(val) => powerUpHandleSearch(val)}
            data={initialData.powerUp}
            header={tableHeaders(navigate)}
            tableTitle="Power-Up Content"
            handleEdit={({ company }) => navigate(`monthly-team-activity/edit/${company['_id']}?fieldName=powerUp`)}
            LIMIT={5}
            handleAdd={() => navigate('/companies')}
            buttonText="+ Add content"
            handlePageChange={(val) => powerUpHandlePageChange(val)}
          />
          <Table
            searchValue={powerDownSearchValue}
            handleSearch={(val) => powerDownHandleSearch(val)}
            data={initialData.powerDown}
            header={tableHeaders(navigate)}
            tableTitle="Power-Down Content"
            handleEdit={({ company }) => navigate(`monthly-team-activity/edit/${company['_id']}?fieldName=powerDown`)}
            LIMIT={5}
            handleAdd={() => navigate('/companies')}
            buttonText="+ Add content"
            handlePageChange={(val) => powerDownHandlePageChange(val)}
          />
          <div>
            <Title title="COMMUNITY CONTENT" fontSize="text-2xl" costumeStyles="p-mt-6 p-mb-3" />
            <Table
              searchValue={communitySearchValue}
              handleSearch={(val) => communityHandleSearch(val)}
              data={initialData.communityData}
              header={communityDataHeader}
              tableTitle="Community Content"
              handleEdit={({ _id }) => navigate(`community-article/edit/${_id}`)}
              handlePageChange={(val) => communityHandlePageChange(val)}
              // handleAdd={() => navigate('community-article/new/new-community-content')}
              handleAdd={() => navigate('/companies')}
              buttonText="+ Add content"
              LIMIT={5}
            />
          </div>
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

const tableHeaders = (navigate: any) => [
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
    body: ({ startDate }: { startDate: Date }) => startDate && dateFormatter.format(new Date(startDate)),
  },
  {
    name: 'END DATE/TIME',
    body: ({ endDate }: { endDate: Date }) => endDate && dateFormatter.format(new Date(endDate)),
  },
  {
    name: 'COMPANY',
    body: ({ company }: { company: any }) => <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/companies/${company['_id']}`)}>{company.name}</div>,
  },
];

const communityDataHeader = [
  {
    name: 'CONTENT TITLE',
    field: 'title',
  },
  {
    name: 'PUBLISHED',
    body: ({ createdAt }: { createdAt: Date }) => createdAt && communityDateFormatter.format(new Date(createdAt)),
  },
  {
    name: 'CATEGORY',
    field: 'category.name',
  },
];

const dateFormatter = Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

const communityDateFormatter = Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});
