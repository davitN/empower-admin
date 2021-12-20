/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { ISignInData, ISignUpData } from '../../types/auth';
import notificationService from '../../services/notification.service';
import { IUserData } from '../../types/main';
// import {setMonitoringUsername} from '../../utils/monitoring';
import { setUserDataAction } from '../ducks/authDuck';
import { DEFAULT, resetStoreAction, checkedSignedInAction } from '../ducks/mainDuck';

export function* signInSaga(payload: { data: ISignInData; callback?: Function; type: string }) {
  try {
    const res: IUserData = yield axiosInstance.post('authorization/login', payload.data);
    if (payload.callback) {
      payload.callback();
    }
    yield localStorage.setItem('token', res.accessToken);
    yield put(setUserDataAction(res));
    yield put(checkedSignedInAction(true));
  } catch (error: any) {
    notificationService.error(error.response.data.message, '', 500);
    if (payload.callback) {
      payload.callback();
    }
  }
}

export function* signUpSaga(payload: { data: ISignUpData; callback: Function; type: string }) {
  try {
    // const res: IUserData = yield axiosInstance.put('registration/register', {
    //   OS: Platform.OS,
    //   // deviceToken: pushNotificationData.token,
    // });
    const res: IUserData = yield axiosInstance.post('registration/register', payload.data);
    // yield notifyAction(
    //   'success',
    //   'Success',
    //   'You have registered Successfully',
    // );
    // setMonitoringUsername(res.username);
    // yield AsyncStorage.setItem("token", res.accessToken);
    yield put(setUserDataAction(res));
    payload.callback();
  } catch (error: any) {
    // yield put(notifyAction("warning", "Note", error.response?.data.message, true));
  } finally {
    yield put({ type: DEFAULT });
  }
}

export function* logoutSaga() {
  try {
    yield localStorage.removeItem('token');
    yield put(resetStoreAction());
  } catch (error) {
    // yield notifyAction("error", "Error", "Something went wrong", true);
  }
}
