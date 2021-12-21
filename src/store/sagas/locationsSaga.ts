/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setLocations, setLocationDetails, setLocationAdmins } from '../ducks/locationsDuck';
import {
  GetLocationsOptions, GetLocationsData, GetLocationDetails, LocationItem, GetLocationAdminsParams,
} from '../../types/locations';
import notificationService from '../../services/notification.service';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { AppAdminsData } from '../../types/appAdmin';

export function* getLocations({ data, callbacks }:{ data: GetLocationsOptions, callbacks: CallBacks, type:string }) {
  try {
    const res: GetLocationsData = yield axiosInstance.get('/location/get_locations', {
      params: data,
    });
    yield put(setLocations(res));
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

export function* getLocationDetails({ locationId, callbacks }:{ locationId: GetLocationDetails, callbacks: CallBacks, type: string }) {
  try {
    const res: LocationItem = yield axiosInstance.get(`/location/get/${locationId}`);
    yield put(setLocationDetails(res));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* saveLocationData({ data, callbacks }:{ data: any, callbacks: CallBacks, type: string }) {
  try {
    const formData = new FormData();
    data.logo && formData.append('logo', data.logo);
    data.thumbnail && formData.append('logoThumbnail', data.thumbnail);
    formData.append('data', JSON.stringify(data.data));
    if (data?.locationId) {
      yield axiosInstance.put(`/location/edit/${data.locationId}`, formData);
    } else {
      yield axiosInstance.post('/location/create_location', formData);
    }
    callbacks?.success && callbacks.success();
    notificationService.success(data.companyId ? 'Location has been successfully saved' : 'Location has been successfully added', '', 500);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* getLocationAdmins({ params, callbacks }:{ params: GetLocationAdminsParams, callbacks: CallBacks, type: string }) {
  try {
    const res: AppAdminsData = yield axiosInstance.get('/admin/get_admins', { params });
    yield put(setLocationAdmins(res));
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
