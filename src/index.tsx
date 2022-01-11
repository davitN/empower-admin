/* eslint-disable import/prefer-default-export */
import 'react-notifications/lib/notifications.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore, { sagaMiddleware } from './store/configureStore';
import rootSaga from './store/sagas';
import storeRegistry from './store/storeRegistry';
import Companies from './routes/Companies';
import CompanyDetails from './routes/CompanyDetails';
import AppUsers from './routes/AppUsers';
import UserDetails from './routes/UserDetails';
import Payments from './routes/Payments';
import LocationDetails from './routes/LocationDetails';
import AppContent from './routes/AppContent';
import AppContentDetail from './routes/AppContentDetail';
import AppAdmins from './routes/AppAdmins';
import AppAdminDetails from './routes/AppAdminDetails';
import AppUserAccount from './routes/AppUserAccount';
import Analytics from './routes/Analytics';
import PaymentsFinished from './routes/PaymentsFinished';
import Reports from './routes/Reports';
import EthosCards from './routes/EthosCards';
import EthosCardsDetails from './routes/EthosCardsDetails';
import GeneralContentLibrary from './routes/GeneralContentLibrary';
import GeneralContentLibraryDetails from './routes/GeneralContentLibraryDetails';

export const store = configureStore();
storeRegistry.register(store);

sagaMiddleware.run(() => rootSaga());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="payments" element={<Payments />} />
          <Route path="payments/finished" element={<PaymentsFinished />} />
          <Route path="/" element={<App />}>
            <Route path="companies" element={<Companies />} />
            <Route path="companies/:id" element={<CompanyDetails />} />
            <Route path="app-users" element={<AppUsers />} />
            <Route path="app-users/:id" element={<UserDetails />} />
            <Route path="locations/:id" element={<LocationDetails />} />
            <Route path="app-content" element={<AppContent />} />
            <Route path="app-content/:itemName/:mode/:id" element={<AppContentDetail />} />
            <Route path="app-admins" element={<AppAdmins />} />
            <Route path="app-admins/:type/:id" element={<AppAdminDetails />} />
            <Route path="user-profile" element={<AppUserAccount />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="ethos-cards">
              <Route index element={<EthosCards />} />
              <Route path=":mode" element={<EthosCardsDetails />} />
              <Route path=":mode/:id" element={<EthosCardsDetails />} />
            </Route>
            <Route path="general-content-library">
              <Route index element={<GeneralContentLibrary />} />
              <Route path=":mode" element={<GeneralContentLibraryDetails />} />
              <Route path=":mode/:id" element={<GeneralContentLibraryDetails />} />
            </Route>
            <Route
              path="*"
              element={(
                <main style={{ padding: '1rem' }}>
                  <p>Theres nothing here!</p>
                </main>
              )}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
