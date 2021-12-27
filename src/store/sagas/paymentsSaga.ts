/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import {
  setPaymentStatus,
} from '../ducks/paymentsDuck';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { GetPaymentDataParams, PaymentDataType } from '../../types/payments';

export function* getPaymentData({ params, callbacks }:{ params: GetPaymentDataParams, callbacks: CallBacks, type:string }) {
  try {
    const res: PaymentDataType = yield axiosInstance.get('/payment/get_payment_by_client_secret', {
      params,
    });
    yield put(setPaymentStatus(res));
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
