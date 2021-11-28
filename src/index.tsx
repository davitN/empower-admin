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
import UserManagement from './routes/UserManagement';
import Payments from './routes/Payments';
import WithAuth from './components/shared/WithAuth';

export const store = configureStore();
storeRegistry.register(store);

sagaMiddleware.run(() => rootSaga());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="companies" element={<WithAuth><Companies /></WithAuth>} />
            <Route path="companies/:id" element={<WithAuth><CompanyDetails /></WithAuth>} />
            <Route path="app-users" element={<WithAuth><AppUsers /></WithAuth>} />
            <Route path="user-management" element={<WithAuth><UserManagement /></WithAuth>} />
            <Route path="payments" element={<WithAuth><Payments /></WithAuth>} />
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
