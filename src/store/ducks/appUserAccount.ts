import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { InitialState, User } from '../../types/appUserAccount';

export const GET_APP_USER_ACCOUNT = 'socialize/appUserAccount/getAppUserAccount';
export const SET_APP_USER_ACCOUNT = 'socialize/appUserAccount/setAppUserAccount';
export const RESET_APP_USER_ACCOUNT_STATE = 'socialize/appUserAccount/resetAppUserAccount';

export const UPDATE_APP_USER_ACCOUNT = 'socialize/appUserAccount/updateAppUserAccount';

export const RESET_APP_USER_ACCOUNT_PASSWORD = 'socialize/appUserAccount/resetAppUserAccountPassword';

const initialState: InitialState = {
  user: null,
};

export const appUserAccountReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_APP_USER_ACCOUNT:
      return {
        ...state,
        user: (payload as User),
      };
    case RESET_APP_USER_ACCOUNT_STATE:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const setAppUserAccount = (data: User) => ({
  type: SET_APP_USER_ACCOUNT,
  payload: data,
});

export const getAppUserAccount = (callbacks?: CallBacks) => ({
  type: GET_APP_USER_ACCOUNT,
  callbacks,
});

export const resetAppUserAccountState = () => ({
  type: RESET_APP_USER_ACCOUNT_STATE,
});

export const updateAppUserAccount = (data: User, callbacks?: CallBacks) => ({
  type: UPDATE_APP_USER_ACCOUNT,
  data,
  callbacks,
});

export const resetAppUserAccountPassword = (callbacks?: CallBacks) => ({
  type: RESET_APP_USER_ACCOUNT_PASSWORD,
  callbacks,
});
