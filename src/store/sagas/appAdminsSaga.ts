/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, delay } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setAppAdmins, resetAppAdminsState } from '../ducks/appAdminsDuck';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { AppAdminsData } from '../../types/appAdmin';

export function* getAppAdmins({ params, callbacks }:{ params: any, callbacks: CallBacks, type:string }) {
  try {
    if (params.searchWord) {
      yield put(resetAppAdminsState());
      yield delay(300);
    }
    const res: AppAdminsData = yield axiosInstance.get('/admin/get_admins', {
      params,
    });
    yield put(setAppAdmins(res));
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
