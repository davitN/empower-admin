/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import notificationService from '../../services/notification.service';
import { ForYouItem, SaveForYou } from '../../types/forYou';

import { CallBacks } from '../../types/main';
import { setForYou } from '../ducks/forYouDucks';
import { notifyAction } from '../ducks/mainDuck';

export function* getForYou({ callbacks }:{ callbacks: CallBacks, type:string }) {
  try {
    const res: ForYouItem[] = yield axiosInstance.get('/content/for_you/get_for_you_data');
    yield put(setForYou(res));
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

export function* saveForYou({ data, callbacks }:{ data: SaveForYou, callbacks: CallBacks, type: string }) {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data.data));
    formData.append('content', data.file);
    yield axiosInstance.post('/content/for_you/add_content', formData);
    callbacks?.success && callbacks.success();
    notificationService.success('Item has been successfully added', '', 1000);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* removeForYou({ id, callbacks }:{ id: string, callbacks: CallBacks, type:string }) {
  try {
    yield axiosInstance.delete(`/content/for_you/delete/${id}`);
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
