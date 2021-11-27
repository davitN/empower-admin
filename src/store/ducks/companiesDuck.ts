import { AnyAction } from 'redux';
import { GetDataOptions, DataTypes } from '../../types/companies';

export const GET_COMPANIES = 'socialize/companies/getCompanies';
export const SET_COMPANIES = 'socialize/companies/setCompanies';

const initialState: Array<DataTypes> | null = null;

export const companiesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_COMPANIES:
      return [
        ...action.data,
      ];
    default:
      return state;
  }
};

export const setCompanies = (data: Array<DataTypes>) => ({
  type: SET_COMPANIES,
  data,
});

export const getCompanies = (data: GetDataOptions, callback?: Function) => ({
  type: GET_COMPANIES,
  data,
  callback,
});
