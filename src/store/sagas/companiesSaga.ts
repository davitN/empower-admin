/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setCompanies } from '../ducks/companiesDuck';
import { CompanyItem, GetDataOptions } from '../../types/companies';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';

export function* getCompanies({ data }:{ data: GetDataOptions, callbacks: CallBacks, type:string }) {
  try {
    const res: CompanyItem[] = yield axiosInstance.get('/company/get_companies', {
      params: data,
    });
    yield put(setCompanies(res));
  } catch (error: any) {
    yield put(
      notifyAction({
        type: 'error',
        message: error.response?.data.message,
        showError: false,
      }),
    );
  }
}
