/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, delay } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setAppContent } from '../ducks/appContentDuck';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';

export function* getAppContent({ callbacks }:{ data: any, callbacks: CallBacks, type:string }) {
  try {
    const res: any = yield axiosInstance.get('/content/get_initial_data');
    yield put(setAppContent(res));
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
