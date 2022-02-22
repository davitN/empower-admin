import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Container from '../components/shared/Container';
import Table from '../components/shared/Table';
import useGetData from '../helpers/hooks/useGetDataV2';
import { getAppLibraries, removeAppLibrary, resetAppLibrariesState } from '../store/ducks/appLibraryDucks';
import { RootState } from '../store/configureStore';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import { Media } from '../types/main';

const AppLibrary = () => {
  const dispatch = useDispatch();
  const [removing, setRemoving] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const { libraries } = useSelector((state: RootState) => state.appLibrariesReducer);
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
        setVisible(false);
      },
      success: () => {
        setRemoving(false);
        setSelectedId('');
        dispatch(resetAppLibrariesState());
        dispatch(getAppLibraries({
          offset: 0,
          limit: 0,
        }));
        setVisible(false);
      },
    }));
  };
  return (
    <Container sectionTitle="How To">
      <ConfirmDialog
        visible={visible}
        loading={removing}
        title="Remove App Library"
        description="Are you sure you want to proceed?"
        handleClose={() => setVisible(false)}
        handleSuccess={() => handleRemove()}
      />
      <Table
        searchValue={params?.filter || ''}
        data={libraries || null}
        header={tableHeaders}
        tableTitle="LIBRARIES"
        handleSearch={(val) => handleParamsChange({ filter: val })}
        handleAdd={() => navigate('new')}
        handleRemove={({ _id }) => {
          setVisible(true);
          setSelectedId(_id);
        }}
        buttonText="+ Add"
        hideEdit
        showRemove
      />

      <Table
        costumeClasses="p-mt-6"
        searchValue={params?.filter || ''}
        data={libraries || null}
        header={tableHeaders}
        tableTitle="FOR YOU"
        handleSearch={(val) => handleParamsChange({ filter: val })}
        handleAdd={() => navigate('/for-you/new')}
        handleRemove={({ _id }) => {
          setVisible(true);
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
