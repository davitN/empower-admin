import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../components/shared/Container';
import Table from '../components/shared/Table';
import useGetData from '../helpers/hooks/useGetDataV2';
import { getAppLibraries, resetAppLibrariesState } from '../store/ducks/appLibraryDucks';
import { RootState } from '../store/configureStore';

const AppLibrary = () => {
  const navigate = useNavigate();
  const { libraries } = useSelector((state: RootState) => state.appLibrariesReducer);
  const { params, handleParamsChange } = useGetData({
    getDataAction: getAppLibraries,
    resetState: resetAppLibrariesState,
    resetOnUnmount: true,
  });
  return (
    <Container sectionTitle="How To">
      <Table
        searchValue={params?.filter || ''}
        data={libraries || null}
        header={tableHeaders}
        tableTitle="CATEGORIES"
        handleSearch={(val) => handleParamsChange({ filter: val })}
        handleEdit={({ _id }) => navigate(`edit/${_id}`)}
        handleAdd={() => navigate('new')}
        buttonText="+ Add"
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
];
