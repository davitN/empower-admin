import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from '../components/shared/Container';
import { getContentsData, resetContentsData } from '../store/ducks/generalContentLibraryDuck';

const GeneralContentLibrary = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContentsData());
    return () => {
      (async () => {
        await dispatch(resetContentsData());
      })();
    };
  }, []);
  return (
    <Container sectionTitle="GENERAL CONTENT LIBRARY">
      qd
    </Container>
  );
};

export default GeneralContentLibrary;
