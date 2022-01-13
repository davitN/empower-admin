/* eslint-disable import/prefer-default-export */
import 'react-notifications/lib/notifications.css';
import React, { ReactElement } from 'react';
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

interface RouteType {
  type: 'nested' | 'default',
  name: string,
  path: string,
  element?: ReactElement,
  disabled?: boolean,
  hiddenInNav?: boolean,
  nestedRoutes?: {
    index?: boolean,
    element: ReactElement,
    path?: string,
    disabled?: boolean
  }[]
}

const routes: RouteType[] = [
  {
    type: 'nested',
    name: 'Company',
    path: 'companies',
    nestedRoutes: [
      {
        index: true,
        element: <Companies />,
      },
      {
        path: ':companyId',
        element: <CompanyDetails />,
      },
    ],
  },
  {
    type: 'nested',
    name: 'App Users',
    path: 'app-users',
    nestedRoutes: [
      {
        index: true,
        element: <AppUsers />,
      },
      {
        path: ':userId',
        element: <UserDetails />,
      },
    ],
  },
  {
    type: 'nested',
    name: 'App Content',
    path: 'app-content',
    nestedRoutes: [
      {
        index: true,
        element: <AppContent />,
      },
      {
        path: ':itemName/:mode/:id',
        element: <AppContentDetail />,
      },
    ],
  },
  {
    type: 'nested',
    name: 'App Admins',
    path: 'app-admins',
    nestedRoutes: [
      {
        index: true,
        element: <AppAdmins />,
      },
      {
        path: ':type/:id',
        element: <AppAdminDetails />,
      },
    ],
  },
  {
    type: 'default',
    name: 'Account',
    path: 'user-profile',
    element: <AppUserAccount />,
  },
  {
    type: 'default',
    name: 'Analytics',
    path: 'analytics',
    element: <Analytics />,
  },
  {
    type: 'default',
    name: 'Reports',
    path: 'reports',
    element: <Reports />,
    disabled: true,
  },
  {
    type: 'default',
    name: 'Locations',
    path: 'locations/:id',
    element: <LocationDetails />,
  },
  {
    type: 'nested',
    name: 'Ethos Cards',
    path: 'ethos-cards',
    nestedRoutes: [
      {
        index: true,
        element: <EthosCards />,
      },
      {
        path: ':mode',
        element: <EthosCardsDetails />,
      },
      {
        path: ':mode/:id',
        element: <EthosCardsDetails />,
      },
    ],
  },
  {
    type: 'nested',
    name: 'General Content Library',
    path: 'general-content-library',
    nestedRoutes: [
      {
        index: true,
        element: <GeneralContentLibrary />,
      },
      {
        path: ':mode',
        element: <GeneralContentLibraryDetails />,
      },
      {
        path: ':mode/:id',
        element: <GeneralContentLibraryDetails />,
      },
    ],
  },
];

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="payments" element={<Payments />} />
          <Route path="payments/finished" element={<PaymentsFinished />} />
          <Route path="/" element={<App />}>
            {routes.map((el) => (el.type === 'default' ? !el?.disabled && <Route element={el.element} path={el.path} key={el.path} /> : (
              <Route path={el.path} key={el.path}>
                {el.nestedRoutes?.map((subRoute, index) => <Route index={subRoute?.index} element={subRoute.element} path={subRoute?.path} key={el.path + Math.sqrt(index)} />)}
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
