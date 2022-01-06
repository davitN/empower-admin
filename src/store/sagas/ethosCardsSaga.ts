/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { EthosCardsData } from '../../types/ethosCards';
import { CallBacks, GetDataParams } from '../../types/main';
import { setEthosCards } from '../ducks/ethosCardsDuck';
import { notifyAction } from '../ducks/mainDuck';

export function* getEthosCards({ params, callbacks }:{ params: GetDataParams, callbacks: CallBacks, type:string }) {
  try {
    const res: EthosCardsData = yield axiosInstance.get('/ethos_card/get_ethos_cards', { params });
    yield put(setEthosCards(res));
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
