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
import Payments from './routes/Payments';
import PaymentsFinished from './routes/PaymentsFinished';
import { routes } from './helpers/routes';
import SetPassword from './routes/SetPassword';

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
          <Route path="set_password" element={<SetPassword />} />
          <Route path="reset_password" element={<SetPassword />} />
          <Route path="/" element={<App />}>
            {routes.map(({
              Component, type, disabled, path, nestedRoutes,
            }) => (type === 'default' ? !disabled && (
            <Route
              element={<Component />}
              path={path}
              key={path}
            />
            ) : (
              <Route path={path} key={path}>
                {nestedRoutes?.map(({ index: subIndex, Component: SubComponent, path: subPath }, index) => (
                  <Route
                    index={subIndex}
                    element={<SubComponent />}
                    path={subPath}
                    key={(subPath || '') + Math.sqrt(index)}
                  />
                ))}
              </Route>
            )))}
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

// old routes
// <Route path="/" element={<App />}>
// <Route path="companies">
//   <Route index element={<Companies />} />
//   <Route path=":companyId" element={<CompanyDetails />} />
// </Route>
// <Route path="locations/:id" element={<LocationDetails />} />
// <Route path="app-users">
//   <Route index element={<AppUsers />} />
//   <Route path=":id" element={<UserDetails />} />
// </Route>
// <Route path="app-content">
//   <Route index element={<AppContent />} />
//   <Route path=":itemName/:mode/:id" element={<AppContentDetail />} />
// </Route>
// <Route path="app-admins">
//   <Route index element={<AppAdmins />} />
//   <Route path=":type/:id" element={<AppAdminDetails />} />
// </Route>
// <Route path="user-profile" element={<AppUserAccount />} />
// <Route path="analytics" element={<Analytics />} />
// <Route path="reports" element={<Reports />} />
// <Route path="ethos-cards">
//   <Route index element={<EthosCards />} />
//   <Route path=":mode" element={<EthosCardsDetails />} />
//   <Route path=":mode/:id" element={<EthosCardsDetails />} />
// </Route>
// <Route path="general-content-library">
//   <Route index element={<GeneralContentLibrary />} />
//   <Route path=":mode" element={<GeneralContentLibraryDetails />} />
//   <Route path=":mode/:id" element={<GeneralContentLibraryDetails />} />
// </Route>
