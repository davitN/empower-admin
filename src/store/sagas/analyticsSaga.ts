/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { AnalyticsData } from '../../types/analytics';

import { CallBacks } from '../../types/main';
import { setAnalytics } from '../ducks/analyticsDuck';
import { notifyAction } from '../ducks/mainDuck';

export function* getAnalytics({ companyId, locationId, callbacks }:{ companyId: string, locationId:string, callbacks: CallBacks, type:string }) {
  try {
    let customEndpoint = '/report/get_analytics';

    if(companyId) {
      customEndpoint = `/report/get_analytics_by_company/${companyId}`;
    } else if(locationId) {
      customEndpoint = `/report/get_analytics_by_location/${locationId}`;
    }

    const res: AnalyticsData = yield axiosInstance.get(customEndpoint);
    yield put(setAnalytics(res));
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
