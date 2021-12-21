/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { setCompanies, setCompanyDetails, setCompanyAdmins } from '../ducks/companiesDuck';
import {
  CompaniesTypes, GetCompaniesOptions, GetCompanyDetailsTypes, CompanyItem, SaveDataTypes, GetCompanyAdminsParams,
} from '../../types/companies';
import {
  AppAdminsData,
} from '../../types/appAdmin';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import notificationService from '../../services/notification.service';

export function* getCompanies({ data, callbacks }:{ data: GetCompaniesOptions, callbacks: CallBacks, type:string }) {
  try {
    const res: CompaniesTypes = yield axiosInstance.get('/company/get_companies', {
      params: data,
    });
    yield put(setCompanies(res));
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

export function* getCompanyDetails({ id, callbacks }:{ id: GetCompanyDetailsTypes, callbacks: CallBacks, type: string }) {
  try {
    const res: CompanyItem = yield axiosInstance.get(`/company/get/${id}`);
    yield put(setCompanyDetails(res));
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

export function* saveCompanyData({ data, callbacks }:{ data: SaveDataTypes, callbacks: CallBacks, type: string }) {
  try {
    const formData = new FormData();
    data.logo && formData.append('logo', data.logo);
    data.thumbnail && formData.append('logoThumbnail', data.thumbnail);
    formData.append('data', JSON.stringify(data.data));
    if (data?.companyId) {
      yield axiosInstance.put(`/company/edit/${data.companyId}`, formData);
    } else {
      yield axiosInstance.post('/company/create_company', formData);
    }
    callbacks?.success && callbacks.success();
    notificationService.success(data.companyId ? 'Company has been successfully saved' : 'Company has been successfully added', '', 500);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
    notificationService.error(error.response.data.message, '', 500);
  }
}

export function* getCompanyAdmins({ params, callbacks }:{ params: GetCompanyAdminsParams, callbacks: CallBacks, type: string }) {
  try {
    const res: AppAdminsData = yield axiosInstance.get('/admin/get_admins', { params });
    yield put(setCompanyAdmins(res));
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
