import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';

export const GET_APP_USERS = 'socialize/locations/getAppUsers';
export const SET_APP_USERS = 'socialize/locations/setAppUsers';
export const RESET_APP_USERS_STATE = 'socialize/locations/resetAppUsers';

const initialState: any = {
  users: null,
};

export const appUsersReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_APP_USERS:
      return {
        users: (payload as any),
      };
    case RESET_APP_USERS_STATE:
      return {
        ...state,
        users: null,
      };
    default:
      return state;
  }
};

export const setAppUsers = (data: any) => ({
  type: SET_APP_USERS,
  payload: data,
});

export const getAppUsers = (data: any, callbacks?: CallBacks) => ({
  type: GET_APP_USERS,
  data,
  callbacks,
});

export const resetAppUsersState = () => ({
  type: RESET_APP_USERS_STATE,
});
