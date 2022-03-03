import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from '../components/shared/Container';
import Table from '../components/shared/Table';
import useGetData from '../helpers/hooks/useGetDataV2';
import { getAppLibraries, removeAppLibrary, resetAppLibrariesState } from '../store/ducks/appLibraryDucks';
import { RootState } from '../store/configureStore';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import { Media } from '../types/main';
import { getForYou, removeForYou, resetForYouState } from '../store/ducks/forYouDucks';

const AppLibrary = () => {
  const dispatch = useDispatch();
  const [removing, setRemoving] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [modalType, setModalType] = useState<'library' | 'forYou' | null>(null);
  const navigate = useNavigate();
  const { libraries } = useSelector((state: RootState) => state.appLibrariesReducer);
  const forYou = useSelector((state: RootState) => state.forYouReducer);

  const { params, handleParamsChange } = useGetData({
    getDataAction: getAppLibraries,
    resetState: resetAppLibrariesState,
    resetOnUnmount: true,
  });

  const handleRemove = () => {
    setRemoving(true);
    dispatch(removeAppLibrary(selectedId, {
      error: () => {
        setRemoving(false);
        setSelectedId('');
        setModalType(null);
      },
      success: () => {
        setRemoving(false);
        setSelectedId('');
        dispatch(resetAppLibrariesState());
        dispatch(getAppLibraries({
          offset: 0,
          limit: 0,
        }));
        setModalType(null);
      },
    }));
  };

  const handleRemoveForYou = () => {
    setRemoving(true);
    dispatch(removeForYou(selectedId, {
      error: () => {
        setRemoving(false);
        setSelectedId('');
        setModalType(null);
      },
      success: () => {
        setRemoving(false);
        setSelectedId('');
        dispatch(resetForYouState());
        dispatch(getForYou());
        setModalType(null);
      },
    }));
  };

  useEffect(() => {
    dispatch(getForYou());
  }, []);

  return (
    <Container sectionTitle="How To">
      <ConfirmDialog
        visible={Boolean(modalType)}
        loading={removing}
        title={`Remove ${modalType === 'forYou' ? 'For You' : 'Library'}`}
        description="Are you sure you want to proceed?"
        handleClose={() => setModalType(null)}
        handleSuccess={() => (modalType === 'library' ? handleRemove() : handleRemoveForYou())}
      />
      <Table
        searchValue={params?.filter || ''}
        data={libraries || null}
        header={tableHeaders}
        tableTitle="LIBRARIES"
        handleSearch={(val) => handleParamsChange({ filter: val })}
        handleAdd={() => navigate('new')}
        handleRemove={({ _id }) => {
          setModalType('library');
          setSelectedId(_id);
        }}
        buttonText="+ Add"
        hideEdit
        showRemove
      />

      <Table
        costumeClasses="p-mt-6"
        data={forYou ? { data: forYou } : null}
        header={forYouHeaders}
        tableTitle="FOR YOU"
        handleAdd={() => navigate('/for-you/new')}
        handleRemove={({ _id }) => {
          setModalType('forYou');
          setSelectedId(_id);
        }}
        buttonText="+ Add"
        hideEdit
        showRemove
      />
    </Container>
  );
};

export default AppLibrary;

const tableHeaders = [
  {
    name: 'NAME',
    field: 'title',
  },
  {
    name: 'See content',
    body: ({ content }: { content: Media }) => <a href={content.URL}>See content</a>,
  },
];

const forYouHeaders = [
  {
    name: 'TYPE',
    field: 'type',
  },
  {
    name: 'TITLE',
    field: 'title',
  },
  {
    name: 'Subtitle',
    field: 'subTitle',
  },
  {
    name: 'description',
    body: ({ description }: { description: string }) => {
      if (description?.length > 20) {
        return `${description?.slice(0, 20)}...`;
      }
      return description;
    },
  },
  {
    name: 'See content',
    body: ({ content }: { content: Media }) => <a href={content.URL}>See content</a>,
  },
];
