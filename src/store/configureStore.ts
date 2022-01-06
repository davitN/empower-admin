/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyAction, applyMiddleware, combineReducers, createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  authReducer,
  mainReducer,
  companiesReducer,
  locationsReducer,
  appUsersReducer,
  appContentReducer,
  appAdminsReducer,
  appUserAccountReducer,
  paymentsReducer,
  reportsReducer,
  ethosCardsReducer,
} from './ducks';
import { RESET_STORE } from './ducks/mainDuck';

export const sagaMiddleware = createSagaMiddleware();

const appReducer = combineReducers({
  mainReducer,
  authReducer,
  companiesReducer,
  locationsReducer,
  appUsersReducer,
  appContentReducer,
  appAdminsReducer,
  appUserAccountReducer,
  paymentsReducer,
  reportsReducer,
  ethosCardsReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: ReturnType<typeof Object>, action: AnyAction) => {
  let temp = state;
  if (action.type === RESET_STORE) {
    temp = {
      mainReducer: {
        isLoading: action.isLoading,
        isSignedIn: false,
      },
    };
    return appReducer(temp, action);
  }
  return appReducer(temp, action);
};

export default function configureStore() {
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });
  const composedEnhancers = composeEnhancers(
    middlewareEnhancer,
    // other store enhancers if any
  );

  const store = createStore(rootReducer, {}, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    (module as any).hot.accept('./ducks', () => store.replaceReducer(rootReducer));
  }

  return store;
}
