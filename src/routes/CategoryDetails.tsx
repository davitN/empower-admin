import { Skeleton } from 'primereact/skeleton';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../components/shared/Container';
import FormsSharedComponent from '../components/shared/FormsSharedComponent';
import TextInput from '../components/shared/Inputs/TextInput';
import { RootState } from '../store/configureStore';
import { getCategoryDetails, saveCategory } from '../store/ducks/categoriesDuck';
import { CategoryItem } from '../types/categories';

const CategoryDetails = () => {
  const classes = useStyles();
  const { mode, id: categoryId } = useParams();
  const { categoryDetails }: { categoryDetails: CategoryItem } = useSelector((state: RootState) => state.categoriesReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNewItem = mode === 'new';
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState<ValuesType>({
    name: '',
  });

  const handleSave = () => {
    setLoading(true);
    dispatch(saveCategory(
      {
        data: {
          ...values,
        },
        categoryId: categoryId || null,
      },
      {
        success: () => {
          setLoading(false);
          navigate('/categories');
        },
        error: () => setLoading(false),
      },
    ));
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryDetails(categoryId));
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryDetails) {
      setValues({
        name: categoryDetails.name,
        ordering: categoryDetails.ordering,
      });
    }
  }, [categoryDetails]);

  return (
    <Container sectionTitle={`${isNewItem ? 'Add' : 'Edit'} Category`}>
      <div className={classes.wrapper}>
        <div className={classes.inputs}>
          {(!isNewItem && !categoryDetails) ? (
            new Array(2).fill(0).map((_, index) => <Skeleton key={`${index + 1}loader`} width="100%" height="3rem" />)
          ) : (
            <>
              <TextInput value={values.name} label="Category Name" handleChange={(name) => setValues({ ...values, name })} />
              {!isNewItem && <TextInput type="number" value={values.ordering || null} label="Order" handleChange={(ordering) => setValues({ ...values, ordering: Number(ordering) })} />}
            </>
          )}
        </div>
        <div className={classes.justifyEnd}>
          <FormsSharedComponent
            save={{
              handler: () => handleSave(),
              label: isNewItem ? 'Add category' : 'Update Category',
              loading: isLoading || (!isNewItem && !categoryDetails),
            }}
            remove={{
              handler: () => console.log('remove'),
              label: 'Remove Category',
              loading: isLoading || !categoryDetails,
              hidden: isNewItem,
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default CategoryDetails;

const useStyles = createUseStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '5rem',
    paddingTop: '2rem',
  },
  inputs: {
    display: 'grid',
    gridTemplateRows: 'repeat( auto-fit, minmax(0, max-content) )',
    gridGap: '1.5rem',
  },
  justifyEnd: {
    justifySelf: 'end',
    display: 'grid',
    gridTemplateRows: 'repeat( auto-fit, minmax(0, max-content) )',
    gap: '1rem',
    justifyItems: 'end',
  },
});

interface ValuesType {
  name: string,
  ordering?: number
}
