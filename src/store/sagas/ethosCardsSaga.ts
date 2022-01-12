/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { EthosCard, EthosCardsData, SaveParamsTypes } from '../../types/ethosCards';
import { CallBacks, GetDataParams } from '../../types/main';
import { setEthosCardDetails, setEthosCards } from '../ducks/ethosCardsDuck';
import { notifyAction } from '../ducks/mainDuck';
import notificationService from '../../services/notification.service';

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

export function* getEthosCardDetails({ id, callbacks }:{ id: string, callbacks: CallBacks, type:string }) {
  try {
    const res: EthosCard = yield axiosInstance.get(`/ethos_card/get/${id}`);
    yield put(setEthosCardDetails(res));
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

export function* saveEthosCardDetails({ params, callbacks }:{ params: SaveParamsTypes, callbacks: CallBacks, type: string }) {
  try {
    const formData = new FormData();
    params.image && formData.append('image', params.image);
    params.thumbnail && formData.append('imageThumbnail', params.thumbnail);
    params.audio && formData.append('audio', params.audio);
    formData.append('data', JSON.stringify(params.data));
    if (params?.ethosCardId) {
      yield axiosInstance.put(`/ethos_card/edit/${params.ethosCardId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      yield axiosInstance.post('/ethos_card/create_ethos_card', formData);
    }
    callbacks?.success && callbacks.success();
    notificationService.success(params.ethosCardId ? 'Ethos Card has been successfully saved' : 'Ethos Card has been successfully added', '', 1000);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 1000);
  }
}
