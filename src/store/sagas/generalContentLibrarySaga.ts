/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { FetchedInitialStates, GetContentItemOptions, FetchedItem } from '../../types/generalContentLibrary';
import { CallBacks } from '../../types/main';
import { setContentItem, setContentsData } from '../ducks/generalContentLibraryDuck';
import { notifyAction } from '../ducks/mainDuck';

export function* getContentsData({ callbacks }:{ callbacks: CallBacks, type:string }) {
  try {
    const res: FetchedInitialStates = yield axiosInstance.get('/content/general_content/get_main_general_content');
    yield put(setContentsData(res));
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

export function* getContentItem({ params, callbacks }:{ params: GetContentItemOptions, callbacks: CallBacks, type:string }) {
  try {
    const res: FetchedItem = yield axiosInstance.get('/content/general_content/get_general_content_by_type', {
      params,
    });
    yield put(setContentItem(res, params.type));
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
