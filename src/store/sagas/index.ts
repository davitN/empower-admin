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
import { getAppUsers, getAppUserDetails } from './appUsersSaga';
import { GET_APP_USERS, GET_APP_USER_DETAILS } from '../ducks/appUsersDuck';

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
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
