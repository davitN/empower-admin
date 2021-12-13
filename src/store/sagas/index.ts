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
import { getAppUsers, getAppUserDetails, saveAppUserDetails } from './appUsersSaga';
import { GET_APP_USERS, GET_APP_USER_DETAILS, SAVE_APP_USER_DETAILS } from '../ducks/appUsersDuck';
import {
  GET_APP_CONTENT, GET_COMMUNITY_DATA, GET_APP_CONTENT_ITEM, ADD_APP_CONTENT_ITEM, GET_APP_CONTENT_CATEGORIES, ADD_COMMUNITY_DATA,
} from '../ducks/appContentDuck';
import {
  getAppContent, getCommunityData, getAppContentItem, addAppContentItem, getAppContentCategory, addCommunityData,
} from './appContentSaga';

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
  yield takeLatest(ADD_APP_CONTENT_ITEM, addAppContentItem);
  yield takeLatest(GET_APP_CONTENT_CATEGORIES, getAppContentCategory);
  yield takeLatest(ADD_COMMUNITY_DATA, addCommunityData);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
