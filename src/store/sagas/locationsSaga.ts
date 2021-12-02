/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, delay } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setLocations, resetLocationsState } from '../ducks/locationsDuck';
import { GetLocationsOptions, GetLocationsData } from '../../types/locations';
import notificationService from '../../services/notification.service';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';

export function* getLocations({ data, callbacks }:{ data: GetLocationsOptions, callbacks: CallBacks, type:string }) {
  try {
    if (data.searchWord) {
      yield put(resetLocationsState());
      yield delay(300);
    }
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

export function* saveLocationData({ data, callbacks }:{ data: any, callbacks: CallBacks, type: string }) {
  console.log(data);
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
