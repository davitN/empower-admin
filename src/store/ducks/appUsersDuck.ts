import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import {
  InitialState, GetAppUsersData, GetAppUsersOptions, GetAppUserDetailsOptions, GetAppUserDetailsData,
} from '../../types/appUsers';

export const GET_APP_USERS = 'socialize/locations/getAppUsers';
export const SET_APP_USERS = 'socialize/locations/setAppUsers';
export const RESET_APP_USERS_STATE = 'socialize/locations/resetAppUsers';
export const GET_APP_USER_DETAILS = 'socialize/locations/getAppUserDetails';
export const SET_APP_USER_DETAILS = 'socialize/locations/setAppUserDetails';
export const RESET_APP_USER_DETAILS = 'socialize/locations/resetAppUserDetails';

const initialState: InitialState = {
  users: null,
  userDetails: null,
};

export const appUsersReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_APP_USERS:
      return {
        ...state,
        users: (payload as GetAppUsersData),
      };
    case RESET_APP_USERS_STATE:
      return {
        ...state,
        users: null,
      };
    case SET_APP_USER_DETAILS:
      return {
        ...state,
        users: (payload as GetAppUserDetailsData),
      };
    case RESET_APP_USER_DETAILS:
      return {
        ...state,
        userDetails: null,
      };
    default:
      return state;
  }
};

export const setAppUsers = (data: GetAppUsersData) => ({
  type: SET_APP_USERS,
  payload: data,
});

export const getAppUsers = (data: GetAppUsersOptions, callbacks?: CallBacks) => ({
  type: GET_APP_USERS,
  data,
  callbacks,
});

export const resetAppUsersState = () => ({
  type: RESET_APP_USERS_STATE,
});

export const getAppUserDetails = (userId: GetAppUserDetailsOptions, callbacks?: CallBacks) => ({
  type: GET_APP_USER_DETAILS,
  userId,
  callbacks,
});

export const setAppUserDetails = (data: any) => ({
  type: SET_APP_USER_DETAILS,
  payload: data,
});

export const resetAppUserDetails = () => ({
  type: RESET_APP_USER_DETAILS,
});
