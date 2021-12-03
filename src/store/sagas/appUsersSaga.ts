/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, delay } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setAppUsers, resetAppUsersState, setAppUserDetails } from '../ducks/appUsersDuck';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import {
  GetAppUsersData, GetAppUsersOptions, GetAppUserDetailsOptions, GetAppUserDetailsData,
} from '../../types/appUsers';
import notificationService from '../../services/notification.service';

export function* getAppUsers({ data, callbacks }:{ data: GetAppUsersOptions, callbacks: CallBacks, type:string }) {
  try {
    if (data.searchWord) {
      yield put(resetAppUsersState());
      yield delay(300);
    }
    const res: GetAppUsersData = yield axiosInstance.get('/app_user/get_app_users', {
      params: data,
    });
    yield put(setAppUsers(res));
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

export function* getAppUserDetails({ userId, callbacks }:{ userId: GetAppUserDetailsOptions, callbacks: CallBacks, type: string }) {
  try {
    const res: GetAppUserDetailsData = yield axiosInstance.get(`/app_user/get/${userId}`);
    yield put(setAppUserDetails(res));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}
