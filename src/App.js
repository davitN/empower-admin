import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import { NotificationContainer } from 'react-notifications';
import { setLoaderRef } from './services/loader.service';
import GlobalLoader from './components/shared/GlobalLoader';
import Layout from './components/shared/Layout';

const App = () => {
  return (
    <>
      <div className="App">
        <Layout />
      </div>
      <NotificationContainer />
      <GlobalLoader ref={(ref) => setLoaderRef(ref)} />
    </>
  );
};

export default App;
