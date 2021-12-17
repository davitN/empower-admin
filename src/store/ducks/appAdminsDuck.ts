import { AnyAction } from 'redux';
import { CallBacks, GetDataParams } from '../../types/main';
import { InitialState, AppAdminsData } from '../../types/appAdmin';

export const GET_APP_ADMINS = 'socialize/appAdmins/getAppAdmins';
export const SET_APP_ADMINS = 'socialize/appAdmins/setAppAdmins';
export const RESET_APP_ADMINS_STATE = 'socialize/appAdmins/ResetAppAdminsState';

const initialState: InitialState = {
  admins: null,
  adminDetails: null,
};

export const appAdminsReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_APP_ADMINS:
      return {
        ...state,
        admins: (payload as AppAdminsData),
      };
    case RESET_APP_ADMINS_STATE:
      return {
        ...state,
        admins: null,
      };
    default:
      return state;
  }
};

export const getAppAdmins = (params: GetDataParams, callbacks?: CallBacks) => ({
  type: GET_APP_ADMINS,
  params,
  callbacks,
});
export const setAppAdmins = (data: AppAdminsData) => ({
  type: SET_APP_ADMINS,
  payload: data,
});
export const resetAppAdminsState = () => ({
  type: RESET_APP_ADMINS_STATE,
});
