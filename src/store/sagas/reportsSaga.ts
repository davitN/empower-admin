/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import { ReportsCompanyDetails } from '../../types/reports';
import { notifyAction } from '../ducks/mainDuck';
import { setReportsCompany } from '../ducks/reportsDuck';

export function* getReportsCompany({ params, callbacks }:{ params: { companyId: string }, callbacks: CallBacks, type: string }) {
  try {
    const res: ReportsCompanyDetails = yield axiosInstance.get('/report/get_report_by_company', { params });
    yield put(setReportsCompany(res));
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
