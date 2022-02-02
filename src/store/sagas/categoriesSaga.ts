/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import notificationService from '../../services/notification.service';
import { CategoryItem, SaveCategoryParams } from '../../types/categories';

import { CallBacks } from '../../types/main';
import { setCategories, setCategoryDetails } from '../ducks/categoriesDuck';
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

export function* getCategoryDetails({ categoryId, callbacks }: { categoryId: string, callbacks: CallBacks; type: string }) {
  try {
    const res: CategoryItem = yield axiosInstance.get(`/content/category/getById/${categoryId}`);
    yield put(setCategoryDetails(res));
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

export function* saveCategory({ data, callbacks }: { data: SaveCategoryParams, callbacks: CallBacks; type: string }) {
  try {
    if (data.categoryId) {
      yield axiosInstance.put(`/content/category/edit_category/${data.categoryId}`, { ...data.data });
    } else {
      yield axiosInstance.post('/content/category/add_category', {
        ...data.data,
      });
    }
    notificationService.success(data.categoryId ? 'Category has been successfully saved' : 'Category has been successfully added', '', 2000);
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 2000);
  }
}
