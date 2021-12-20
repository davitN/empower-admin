/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setAppUserAccount } from '../ducks/appUserAccount';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { User } from '../../types/appUserAccount';
import notificationService from '../../services/notification.service';

export function* getAppUserAccount({ callbacks }:{ callbacks: CallBacks, type:string }) {
  try {
    const res: User = yield axiosInstance.get('/account/get/');
    yield put(setAppUserAccount(res));
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

export function* updateAppUserAccount({ data, callbacks }:{ data: User, callbacks: CallBacks, type: string }) {
  try {
    yield axiosInstance.put('/account/edit/', data);
    callbacks?.success && callbacks.success();
    notificationService.success('User has been successfully updated', '', 500);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}
