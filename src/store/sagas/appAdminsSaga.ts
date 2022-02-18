/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import {
  setAppAdmins, setAppAdminsRoles, setAppAdminDetails,
} from '../ducks/appAdminsDuck';
import { CallBacks, GetDataParams } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import {
  AppAdminsData, AppAdminsRoles, SaveAppAdmin, AppAdmin,
} from '../../types/appAdmin';
import notificationService from '../../services/notification.service';

export function* getAppAdmins({ params, callbacks }:{ params: GetDataParams, callbacks: CallBacks, type:string }) {
  try {
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

export function* getAppAdminsRoles({ callbacks }:{ callbacks?: CallBacks, type:string }) {
  try {
    const res: AppAdminsRoles[] = yield axiosInstance.get('/admin/get_roles');
    yield put(setAppAdminsRoles(res));
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

export function* saveAppAdminDetails({ data, callbacks }:{ data: SaveAppAdmin, callbacks: CallBacks, type: string }) {
  try {
    if (data?.adminId) {
      yield axiosInstance.put(`/admin/edit/${data.adminId}`, data.data);
    } else {
      yield axiosInstance.post('/admin/create_admin', data.data);
    }
    callbacks?.success && callbacks.success();
    notificationService.success(data?.adminId ? 'Admin has been successfully saved' : 'Admin has been successfully added', '', 500);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* getAppAdminDetails({ adminId, callbacks }:{ adminId: string, callbacks: CallBacks, type: string }) {
  try {
    const res: AppAdmin = yield axiosInstance.get(`/admin/get/${adminId}`);
    yield put(setAppAdminDetails(res));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* removeAppAdmin({ adminId, callbacks }:{ adminId: string, callbacks: CallBacks, type: string }) {
  try {
    yield axiosInstance.delete(`/admin/delete_admin/${adminId}`);
    notificationService.success('Admin was successfully removed', '', 1000);
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}
