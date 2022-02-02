/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CategoryItem } from '../../types/categories';

import { CallBacks } from '../../types/main';
import { setCategories } from '../ducks/categoriesDuck';
import { notifyAction } from '../ducks/mainDuck';

export function* getCategories({ callbacks }: { callbacks: CallBacks; type: string }) {
  try {
    const res: CategoryItem[] = yield axiosInstance.get('/content/category/get_categories');
    yield put(setCategories(res));
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
