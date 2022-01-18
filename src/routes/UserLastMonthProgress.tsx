import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '../components/shared/Container';
import { getAppUserLastMonthProgress } from '../store/ducks/appUsersDuck';

const UserLastMonthProgress = () => {
  const { userId } = useParams();
  console.log(userId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getAppUserLastMonthProgress(userId));
    }
  }, [userId]);
  return (
    <Container>
      qwdqd
    </Container>
  );
};

export default UserLastMonthProgress;
