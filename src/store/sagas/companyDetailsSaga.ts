/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setCompanyDetails } from '../ducks/companyDetailsDuck';
import { GetCompanyDetailsTypes, CompanyItem } from '../../types/companies';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';

export function* getCompanyDetails({ id, callbacks }:{ id: GetCompanyDetailsTypes, callbacks: CallBacks, type: string }) {
  try {
    const res: CompanyItem = yield axiosInstance.get(`/company/get/${id}`);
    yield put(setCompanyDetails(res));
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
