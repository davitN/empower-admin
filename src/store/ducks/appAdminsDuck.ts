import { AnyAction } from 'redux';
import { CallBacks, GetDataParams } from '../../types/main';
import {
  InitialState, AppAdminsData, AppAdminsRoles, SaveAppAdmin, AppAdmin,
} from '../../types/appAdmin';

export const GET_APP_ADMINS = 'socialize/appAdmins/getAppAdmins';
export const SET_APP_ADMINS = 'socialize/appAdmins/setAppAdmins';
export const RESET_APP_ADMINS_STATE = 'socialize/appAdmins/ResetAppAdminsState';

export const GET_APP_ADMINS_ROLES = 'socialize/appAdmins/getAppAdminsRoles';
export const SET_APP_ADMINS_ROLES = 'socialize/appAdmins/setAppAdminsRoles';
export const RESET_APP_ADMINS_ROLES_STATE = 'socialize/appAdmins/ResetAppAdminsRolesState';

export const GET_APP_ADMIN_DETAILS = 'socialize/appAdmins/getAppAdminDetails';
export const SET_APP_ADMIN_DETAILS = 'socialize/appAdmins/setAppAdminDetails';
export const RESET_APP_ADMIN_DETAILS_STATE = 'socialize/appAdmins/ResetAppAdminDetailsState';

export const SAVE_APP_ADMIN_DETAILS = 'socialize/appAdmins/saveAppAdminDetails';
export const REMOVE_APP_ADMIN = 'socialize/appAdmins/removeAppAdmin';

const initialState: InitialState = {
  admins: null,
  adminDetails: null,
  adminsRoles: null,
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
    case SET_APP_ADMIN_DETAILS:
      return {
        ...state,
        adminDetails: (payload as AppAdmin),
      };
    case RESET_APP_ADMIN_DETAILS_STATE:
      return {
        ...state,
        adminDetails: null,
      };
    case SET_APP_ADMINS_ROLES:
      return {
        ...state,
        adminsRoles: (payload as AppAdminsRoles[]),
      };
    case RESET_APP_ADMINS_ROLES_STATE:
      return {
        ...state,
        adminsRoles: null,
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

export const getAppAdminsRoles = (callbacks?: CallBacks) => ({
  type: GET_APP_ADMINS_ROLES,
  callbacks,
});
export const setAppAdminsRoles = (data: AppAdminsRoles[]) => ({
  type: SET_APP_ADMINS_ROLES,
  payload: data,
});
export const resetAppAdminsRolesState = () => ({
  type: RESET_APP_ADMINS_ROLES_STATE,
});

export const saveAppAdminDetails = (data: SaveAppAdmin, callbacks?: CallBacks) => ({
  type: SAVE_APP_ADMIN_DETAILS,
  callbacks,
  data,
});

export const getAppAdminDetails = (adminId: string, callbacks?: CallBacks) => ({
  type: GET_APP_ADMIN_DETAILS,
  adminId,
  callbacks,
});

export const setAppAdminDetails = (data: AppAdmin) => ({
  type: SET_APP_ADMIN_DETAILS,
  payload: data,
});

export const resetAppAdminDetailsState = () => ({
  type: RESET_APP_ADMIN_DETAILS_STATE,
});

export const removeAppAdmin = (adminId: string, callbacks?: CallBacks) => ({
  type: REMOVE_APP_ADMIN,
  adminId,
  callbacks,
});
