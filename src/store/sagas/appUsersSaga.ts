/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import {
  setAppUsers, setAppUserDetails, setAllAppUsers, setAppUserLastMonthProgress,
} from '../ducks/appUsersDuck';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import {
  GetAppUsersData, GetAppUsersOptions, GetAppUserDetailsOptions, GetAppUserDetailsData, SaveAppUserDetails, LastMonthProgressItems,
} from '../../types/appUsers';
import notificationService from '../../services/notification.service';

interface IRow {
  message: string;
  row: number;
}

export function* getAppUsers({ data, callbacks }:{ data: GetAppUsersOptions, callbacks: CallBacks, type:string }) {
  try {
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

export function* getAllAppUsers({ data, callbacks }:{ data: any, callbacks: CallBacks, type:string }) {
  try {
    const filterData = { ...data };
    if (data.filter && data.filter.firstName) {
      filterData['firstName'] = data.filter.firstName;
    }

    if (data.filter && data.filter.lastName) {
      filterData['lastName'] = data.filter.lastName;
    }

    if (data.filter && data.filter.email) {
      filterData['email'] = data.filter.email;
    }

    const res: GetAppUsersData = yield axiosInstance.get('/app_user/get_app_users', {
      params: filterData,
    });
    yield put(setAllAppUsers(res));
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

export function* getAppUserDetails({ userId, callbacks }:{ userId: GetAppUserDetailsOptions, callbacks?: CallBacks, type: string }) {
  try {
    const res: GetAppUserDetailsData = yield axiosInstance.get(`/app_user/get/${userId}`);
    yield put(setAppUserDetails(res));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* saveAppUserDetails({ data, callbacks }:{ data: SaveAppUserDetails, callbacks: CallBacks, type: string }) {
  try {
    if (data?.userId) {
      yield axiosInstance.put(`/app_user/edit/${data.userId}`, data.data);
    } else {
      yield axiosInstance.post('/app_user/create_app_user', data.data);
    }
    callbacks?.success && callbacks.success();
    notificationService.success(data.userId ? 'User has been successfully saved' : 'User has been successfully added', '', 500);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* saveAppUserDetailsAll({ data, callbacks }:{ data: any, callbacks: CallBacks, type: string }) {
  try {
    const res: IRow[] = yield axiosInstance.post(`/app_user/bulk_registration/${data.selectedLocation}`, data.formData);
    callbacks?.success && callbacks.success(res);
    // notificationService.success(data.userId ? 'User has been successfully saved' : 'User has been successfully added', '', 500);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* sendResetPassword({ userId, callbacks }:{ userId: string, callbacks: CallBacks, type: string }) {
  try {
    yield axiosInstance.post(`/app_user/reset_password/${userId}`);
    callbacks?.success && callbacks.success();
    notificationService.success('Reset password link is sent successfully', '', 700);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* getAppUserLastMonthProgress({ userId, callbacks }:{ userId: string, callbacks: CallBacks, type: string }) {
  try {
    const res: LastMonthProgressItems = yield axiosInstance.get(`/app_user/get_user_last_month_progress/${userId}`);
    yield put(setAppUserLastMonthProgress(res));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* removeAppUser({ id, callbacks }:{ id: string, callbacks: CallBacks, type: string }) {
  try {
    yield axiosInstance.delete(`/app_user/delete/${id}`);
    callbacks?.success && callbacks.success();
    notificationService.success('User has been successfully removed', '', 1000);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}
