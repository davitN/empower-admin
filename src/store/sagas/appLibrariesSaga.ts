/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import notificationService from '../../services/notification.service';
import { LibrariesFetchedData, SaveAppLibrary } from '../../types/appLibrary';

import { CallBacks, GetDataParams } from '../../types/main';
import { setAppLibraries } from '../ducks/appLibraryDucks';
import { notifyAction } from '../ducks/mainDuck';

export function* getAppLibraries({ params, callbacks }:{ params: GetDataParams, callbacks: CallBacks, type:string }) {
  try {
    const res: LibrariesFetchedData = yield axiosInstance.get('/content/how_to/get_how_to_data', { params });
    yield put(setAppLibraries(res));
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

export function* saveAppLibrary({ data, callbacks }:{ data: SaveAppLibrary, callbacks: CallBacks, type: string }) {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data.data));
    formData.append('content', data.file);
    if (data?.id) {
      yield axiosInstance.put(`/content/community_data/edit/${data.id}`, formData);
    } else {
      yield axiosInstance.post('/content/how_to/add_content', formData);
    }
    callbacks?.success && callbacks.success();
    notificationService.success(data?.id ? 'Item has been successfully updated' : 'Item has been successfully added', '', 1000);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* removeAppLibrary({ id, callbacks }:{ id: string, callbacks: CallBacks, type:string }) {
  try {
    yield axiosInstance.delete(`/content/how_to/delete/${id}`);
    notificationService.success('Item has been successfully removed', '', 1000);
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
