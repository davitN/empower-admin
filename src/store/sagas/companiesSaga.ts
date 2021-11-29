/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setCompanies } from '../ducks/companiesDuck';
import { CompanyItem } from '../../types/companies';

export function* getCompanies(action: any) {
  try {
    const data: CompanyItem[] = yield axiosInstance.get('/company/get_companies', {
      params: action.data,
    });
    yield put(setCompanies(data));
  } catch (error) {
    console.log(error);
  }
}
