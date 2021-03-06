import { AnyAction } from 'redux';
import { CallBacks, GetDataParams } from '../../types/main';
import {
  InitialState, GetAppUsersData, GetAppUsersOptions, GetAppUserDetailsOptions, GetAppUserDetailsData, SaveAppUserDetails, LastMonthProgressItems,
} from '../../types/appUsers';

export const GET_APP_USERS = 'socialize/appUsers/getAppUsers';
export const SET_APP_USERS = 'socialize/appUsers/setAppUsers';
export const RESET_APP_USERS_STATE = 'socialize/appUsers/resetAppUsers';

export const GET_APP_USER_DETAILS = 'socialize/appUsers/getAppUserDetails';
export const SET_APP_USER_DETAILS = 'socialize/appUsers/setAppUserDetails';
export const RESET_APP_USER_DETAILS = 'socialize/appUsers/resetAppUserDetails';

export const SAVE_APP_USER_DETAILS = 'socialize/appUsers/saveAppUserDetails';
export const SAVE_APP_USER_DETAILS_ALL = 'socialize/appUsers/saveAppUserDetailsAll';
export const REMOVE_APP_USER_DETAILS = 'socialize/appUsers/removeAppUserDetails';
export const SEND_RESET_PASSWORD = 'socialize/appUsers/sendResetPassword';

export const GET_ALL_APP_USERS = 'socialize/appUsers/getALlAppUsers';
export const SET_ALL_APP_USERS = 'socialize/appUsers/setAllAppUsers';
export const RESET_ALL_APP_USERS_STATE = 'socialize/appUsers/resetAllAppUsers';

export const GET_APP_USER_LAST_MONTH_PROGRESS = 'socialize/appUsers/getAppUsersLastMonthProgress';
export const SET_APP_USER_LAST_MONTH_PROGRESS = 'socialize/appUsers/setAppUsersLastMonthProgress';
export const RESET_APP_USER_LAST_MONTH_PROGRESS_STATE = 'socialize/appUsers/resetAppUsersLastMonthProgress';

const initialState: InitialState = {
  users: null,
  userDetails: null,
  allUsers: null,
  lastMonthProgress: null,
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
        userDetails: (payload as GetAppUserDetailsData),
      };
    case RESET_APP_USER_DETAILS:
      return {
        ...state,
        userDetails: null,
      };
    case SET_ALL_APP_USERS:
      return {
        ...state,
        allUsers: (payload as GetAppUsersData),
      };
    case RESET_ALL_APP_USERS_STATE:
      return {
        ...state,
        allUsers: null,
      };
    case SET_APP_USER_LAST_MONTH_PROGRESS:
      return {
        ...state,
        lastMonthProgress: (payload as LastMonthProgressItems),
      };
    case RESET_APP_USER_LAST_MONTH_PROGRESS_STATE:
      return {
        ...state,
        lastMonthProgress: null,
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

export const saveAppUserDetails = (data: SaveAppUserDetails, callbacks?: CallBacks) => ({
  type: SAVE_APP_USER_DETAILS,
  data,
  callbacks,
});

export const saveAppUserDetailsAll = (data: any, callbacks?: CallBacks) => ({
  type: SAVE_APP_USER_DETAILS_ALL,
  data,
  callbacks,
});

export const sendResetPassword = (userId: any, callbacks?: CallBacks) => ({
  type: SEND_RESET_PASSWORD,
  userId,
  callbacks,
});

export const getAllAppUsers = (data: GetDataParams, callbacks?: CallBacks) => ({
  type: GET_ALL_APP_USERS,
  data,
  callbacks,
});

export const setAllAppUsers = (data: GetAppUsersData) => ({
  type: SET_ALL_APP_USERS,
  payload: data,
});

export const resetAllAppUsersState = () => ({
  type: RESET_ALL_APP_USERS_STATE,
});

export const getAppUserLastMonthProgress = (userId: string, callbacks?: CallBacks) => ({
  type: GET_APP_USER_LAST_MONTH_PROGRESS,
  userId,
  callbacks,
});

export const setAppUserLastMonthProgress = (data: LastMonthProgressItems) => ({
  type: SET_APP_USER_LAST_MONTH_PROGRESS,
  payload: data,
});

export const resetAppUserLastMonthProgressState = () => ({
  type: RESET_APP_USER_LAST_MONTH_PROGRESS_STATE,
});

export const removeAppUser = (id: string, callbacks?: CallBacks) => {
  return {
    type: REMOVE_APP_USER_DETAILS,
    id,
    callbacks,
  };
};
