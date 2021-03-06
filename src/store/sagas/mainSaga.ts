/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { IUserData } from '../../types/main';
// import {setMonitoringUsername} from '../../utils/monitoring';
import { setUserDataAction } from '../ducks/authDuck';
import { checkedSignedInAction } from '../ducks/mainDuck';

export function* checkSignedInSaga() {
  try {
    const userData: IUserData = yield axiosInstance.get('authorization/ping');
    yield put(setUserDataAction(userData));
    yield put(checkedSignedInAction(true));
  } catch (error) {
    yield put(checkedSignedInAction(false));
  }
}
