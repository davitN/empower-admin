import { all, takeLatest } from 'redux-saga/effects';
import { checkSignedInSaga } from './mainSaga';
import { logoutSaga, signInSaga, signUpSaga } from './authSaga';
import {
  CHECK_SIGNED_IN, LOGOUT, REQUEST_SIGN_IN_SG, REQUEST_SIGN_UP_SG,
} from '../ducks/authDuck';
import {
  GET_COMPANIES, GET_COMPANY_DETAILS, SAVE_COMPANY_DATA,
} from '../ducks/companiesDuck';
import {
  getCompanies, getCompanyDetails, saveCompanyData,
} from './companiesSaga';
import { GET_LOCATIONS, SAVE_LOCATION, GET_LOCATION_DETAILS } from '../ducks/locationsDuck';
import { getLocations, saveLocationData, getLocationDetails } from './locationsSaga';
import {
  getAppUsers, getAppUserDetails, saveAppUserDetails, sendResetPassword,
} from './appUsersSaga';
import {
  GET_APP_USERS, GET_APP_USER_DETAILS, SAVE_APP_USER_DETAILS, SEND_RESET_PASSWORD,
} from '../ducks/appUsersDuck';
import {
  GET_APP_CONTENT,
  GET_COMMUNITY_DATA,
  GET_APP_CONTENT_ITEM,
  SAVE_APP_CONTENT_ITEM,
  GET_APP_CONTENT_CATEGORIES,
  SAVE_COMMUNITY_DATA,
  GET_COMMUNITY_DATA_ITEM,
  GET_APP_CONTENT_ITEM_INFO,
} from '../ducks/appContentDuck';
import {
  getAppContent,
  getCommunityData,
  getAppContentItem,
  saveAppContentItem,
  getAppContentCategory,
  saveCommunityData,
  getCommunityDataItem,
  getAppContentItemInfo,
} from './appContentSaga';
import { SET_PASSWORD } from '../ducks/setPasswordDuck';
import { setPassword } from './setPasswordSaga';
import {
  GET_APP_ADMINS, GET_APP_ADMINS_ROLES, SAVE_APP_ADMIN_DETAILS, GET_APP_ADMIN_DETAILS,
} from '../ducks/appAdminsDuck';
import {
  getAppAdmins, getAppAdminsRoles, saveAppAdminDetails, getAppAdminDetails,
} from './appAdminsSaga';

import { GET_APP_USER_ACCOUNT, UPDATE_APP_USER_ACCOUNT, RESET_APP_USER_ACCOUNT_PASSWORD } from '../ducks/appUserAccount';
import { getAppUserAccount, updateAppUserAccount, resetAppUserAccountPassword } from './appUserAccountSaga';

function* actionWatcher() {
  yield takeLatest(CHECK_SIGNED_IN, checkSignedInSaga);
  yield takeLatest(REQUEST_SIGN_IN_SG, signInSaga);
  yield takeLatest(REQUEST_SIGN_UP_SG, signUpSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(GET_COMPANIES, getCompanies);
  yield takeLatest(GET_COMPANY_DETAILS, getCompanyDetails);
  yield takeLatest(SAVE_COMPANY_DATA, saveCompanyData);
  yield takeLatest(GET_LOCATIONS, getLocations);
  yield takeLatest(SAVE_LOCATION, saveLocationData);
  yield takeLatest(GET_LOCATION_DETAILS, getLocationDetails);
  yield takeLatest(GET_APP_USERS, getAppUsers);
  yield takeLatest(GET_APP_USER_DETAILS, getAppUserDetails);
  yield takeLatest(SAVE_APP_USER_DETAILS, saveAppUserDetails);
  yield takeLatest(GET_APP_CONTENT, getAppContent);
  yield takeLatest(GET_COMMUNITY_DATA, getCommunityData);
  yield takeLatest(GET_APP_CONTENT_ITEM, getAppContentItem);
  yield takeLatest(SAVE_APP_CONTENT_ITEM, saveAppContentItem);
  yield takeLatest(GET_APP_CONTENT_CATEGORIES, getAppContentCategory);
  yield takeLatest(SAVE_COMMUNITY_DATA, saveCommunityData);
  yield takeLatest(GET_COMMUNITY_DATA_ITEM, getCommunityDataItem);
  yield takeLatest(GET_APP_CONTENT_ITEM_INFO, getAppContentItemInfo);
  yield takeLatest(SET_PASSWORD, setPassword);
  yield takeLatest(SEND_RESET_PASSWORD, sendResetPassword);
  yield takeLatest(GET_APP_ADMINS, getAppAdmins);
  yield takeLatest(GET_APP_ADMINS_ROLES, getAppAdminsRoles);
  yield takeLatest(SAVE_APP_ADMIN_DETAILS, saveAppAdminDetails);
  yield takeLatest(GET_APP_ADMIN_DETAILS, getAppAdminDetails);
  yield takeLatest(GET_APP_USER_ACCOUNT, getAppUserAccount);
  yield takeLatest(UPDATE_APP_USER_ACCOUNT, updateAppUserAccount);
  yield takeLatest(RESET_APP_USER_ACCOUNT_PASSWORD, resetAppUserAccountPassword);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
