import { AnyAction } from 'redux';
import { GetDataOptions, CompanyItem, InitialState } from '../../types/companies';
import { CallBacks } from '../../types/main';

export const GET_COMPANIES = 'socialize/companies/getCompanies';
export const SET_COMPANIES = 'socialize/companies/setCompanies';

const initialState: InitialState = {
  companies: [],
};

export const companiesReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_COMPANIES:
      return {
        companies: (payload as CompanyItem[]),
      };
    default:
      return state;
  }
};

export const setCompanies = (companies: CompanyItem[]) => ({
  type: SET_COMPANIES,
  payload: companies,
});

export const getCompanies = (data: GetDataOptions, callbacks?: CallBacks) => ({
  type: GET_COMPANIES,
  data,
  callbacks,
});
