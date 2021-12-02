/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, delay } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setLocations, resetLocationsState } from '../ducks/locationsDuck';
// import {
//   CompaniesTypes, GetCompaniesOptions, GetCompanyDetailsTypes, CompanyItem, SaveDataTypes,
// } from '../../types/companies';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';

export function* getLocations({ data, callbacks }:{ data: any, callbacks: CallBacks, type:string }) {
  try {
    if (data.searchWord) {
      yield put(resetLocationsState());
      yield delay(300);
    }
    const res: any = yield axiosInstance.get('/location/get_locations', {
      params: data,
    });
    yield put(setLocations(res));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    yield put(
      notifyAction({
        type: 'error',
        message: error.response?.data.message,
        showError: false,
      }),
    );
  }
}
