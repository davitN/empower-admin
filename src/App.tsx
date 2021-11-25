/* eslint-disable @typescript-eslint/no-var-requires */
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoaderRef } from './services/loader.service';
import GlobalLoader from './components/shared/GlobalLoader';
import Layout from './components/shared/Layout';
import { checkSignedInAction } from './store/ducks/authDuck';
import { RootState } from './store/configureStore';

const { NotificationContainer } = require('react-notifications');

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.mainReducer);

  useEffect(() => {
    dispatch(checkSignedInAction());
  }, []);

  return (
    !isLoading && (
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
