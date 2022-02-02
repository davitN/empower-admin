import { useSelector } from 'react-redux';
import Container from '../components/shared/Container';
import Table from '../components/shared/Table';
import useGetData from '../helpers/hooks/useGetData';
import { getCategories, resetCategoryDetails } from '../store/ducks/categoriesDuck';
import { RootState } from '../store/configureStore';

const Categories = () => {
  const { categories }: { categories: any } = useSelector((state: RootState) => state.categoriesReducer);

  const { searchValue } = useGetData({
    getDataAction: getCategories,
    resetState: resetCategoryDetails,
    resetOnUnmount: true,
  });

  return (
    <Container sectionTitle="Categories">
      <Table
        searchValue={searchValue || ''}
        data={categories ? { data: categories } : null}
        header={tableHeaders}
        tableTitle="CATEGORIES"
        // handleEdit={({ _id }) => navigate(`${_id}`)}
        // handleAdd={() => navigate('new')}
        buttonText="+ Add company"
      />
    </Container>
  );
};

export default Categories;

const tableHeaders = [
  {
    name: 'NAME',
    field: 'name',
  },
  {
    name: 'ORDERING',
    field: 'ordering',
  },
];
