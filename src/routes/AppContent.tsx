import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAppContent } from '../store/ducks/appContentDuck';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppContent());
  }, []);

  return (
    <p>App Content</p>
  );
};

export default AppContent;
