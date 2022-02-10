/* eslint-disable @typescript-eslint/no-var-requires */
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLoaderRef } from './services/loader.service';
import GlobalLoader from './components/shared/GlobalLoader';
import Layout from './components/shared/Layout';
import { checkSignedInAction } from './store/ducks/authDuck';
import { RootState } from './store/configureStore';
import { reset } from './store/ducks/filtersDuck';

const { NotificationContainer } = require('react-notifications');

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.mainReducer);
  const [prevLocation, setPrevLocation] = useState<string>('');

  useEffect(() => {
    dispatch(checkSignedInAction());
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/analytics');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.split('/')[1] !== prevLocation) {
      setPrevLocation(location.pathname.split('/')[1]);
      dispatch(reset());
    }
  }, [location]);

  return (
    isLoading ? null : (
      <>
        <div className="App">
          <Layout />
        </div>
        <NotificationContainer />
        <GlobalLoader ref={(ref) => setLoaderRef(ref)} />
      </>
    )
  );
};

export default App;
