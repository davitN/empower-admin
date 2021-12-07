/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, delay } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setAppContent, setCommunityData, resetCommunityData } from '../ducks/appContentDuck';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { AppContentGetData, GetCommunityData, GetCommunityDataParams } from '../../types/appContent';

export function* getAppContent({ callbacks }:{ data: any, callbacks: CallBacks, type:string }) {
  try {
    const res: AppContentGetData = yield axiosInstance.get('/content/get_initial_data');
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

export function* getCommunityData({ params, callbacks }:{ params: GetCommunityDataParams, callbacks: CallBacks, type:string }) {
  try {
    if (params.searchWord) {
      yield put(resetCommunityData());
      yield delay(300);
    }
    const res: GetCommunityData = yield axiosInstance.get('/content/community_data/get_community_data', {
      params,
    });
    yield put(setCommunityData(res));
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
