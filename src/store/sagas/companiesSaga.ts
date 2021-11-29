/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, delay } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setCompanies, resetCompaniesState } from '../ducks/companiesDuck';
import { CompaniesTypes, GetCompaniesOptions } from '../../types/companies';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';

export function* getCompanies({ data, callbacks }:{ data: GetCompaniesOptions, callbacks: CallBacks, type:string }) {
  try {
    if (data.searchWord) {
      yield put(resetCompaniesState());
      yield delay(300);
    }
    const res: CompaniesTypes = yield axiosInstance.get('/company/get_companies', {
      params: data,
    });
    yield put(setCompanies(res));
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
