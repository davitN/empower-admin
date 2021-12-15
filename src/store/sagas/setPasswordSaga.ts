/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axios from 'axios';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';

export function* setPassword({ data, callbacks }:{ data: { password: string, token: string }, callbacks: CallBacks, type:string }) {
  try {
    yield axios.put(
      'https://api-dev.empowerofyou.com/api/authorization/password_recover',
      { password: data.password },
      { headers: { Authorization: `Bearer ${data.token}` } },
    );
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error(error.response?.data.message || 'Something went wrong...');
    yield put(
      notifyAction({
        type: 'error',
        message: error.response?.data.message,
        showError: false,
      }),
    );
  }
}
