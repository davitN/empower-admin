/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import {
  FetchedInitialStates, GetContentItemOptions, FetchedItem, ContentItem, SaveItem,
} from '../../types/generalContentLibrary';
import { CallBacks } from '../../types/main';
import { setContentItem, setContentItemDetails, setContentsData } from '../ducks/generalContentLibraryDuck';
import { notifyAction } from '../ducks/mainDuck';
import notificationService from '../../services/notification.service';

export function* getContentsData({ callbacks }:{ callbacks: CallBacks, type:string }) {
  try {
    const res: FetchedInitialStates = yield axiosInstance.get('/content/general_content/get_main_general_content');
    yield put(setContentsData(res));
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

export function* getContentItem({ params, callbacks }:{ params: GetContentItemOptions, callbacks: CallBacks, type:string }) {
  try {
    const res: FetchedItem = yield axiosInstance.get('/content/general_content/get_general_content_by_type', {
      params,
    });
    yield put(setContentItem(res, params.type));
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

export function* getContentItemDetails({ id, callbacks }:{ id: string, callbacks: CallBacks, type:string }) {
  try {
    const res: ContentItem = yield axiosInstance.get(`/content/general_content/get/${id}`);
    yield put(setContentItemDetails(res));
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

export function* saveContentItemDetails({ data, callbacks }:{ data: SaveItem, callbacks: CallBacks, type: string }) {
  try {
    const formData = new FormData();
    data.content && formData.append('content', data.content);
    data.image && formData.append('image', data.image);
    data.imageThumbnail && formData.append('imageThumbnail', data.imageThumbnail);
    formData.append('data', JSON.stringify(data.data));
    if (data.contentId) {
      yield axiosInstance.put(`/content/general_content/edit/${data.contentId}`, formData);
    } else {
      yield axiosInstance.post('/content/general_content/create_general_content', formData);
    }
    callbacks?.success && callbacks.success();
    notificationService.success(data?.contentId ? 'Item has been successfully updated' : 'Item has been successfully added', '', 1000);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* removeContentItem({ id, callbacks }:{ id: string, callbacks: CallBacks, type:string }) {
  try {
    yield axiosInstance.delete(`/content/general_content/delete/${id}`);
    notificationService.success('Content successfully removed', '', 1000);
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
