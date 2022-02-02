import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../components/shared/Container';
import Table from '../components/shared/Table';
import useGetData from '../helpers/hooks/useGetData';
import { getCategories, resetCategoryDetails } from '../store/ducks/categoriesDuck';
import { RootState } from '../store/configureStore';
import { CategoryItem } from '../types/categories';

const Categories = () => {
  const navigate = useNavigate();
  const { categories }: { categories: CategoryItem[] } = useSelector((state: RootState) => state.categoriesReducer);

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
        handleEdit={({ _id }) => navigate(`edit/${_id}`)}
        handleAdd={() => navigate('new')}
        buttonText="+ Add category"
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
