import { AnyAction } from 'redux';
import { GetDataOptions, CompanyItem, InitialState } from '../../types/companies';
import { CallBacks } from '../../types/main';

export const GET_COMPANIES = 'socialize/companies/getCompanies';
export const SET_COMPANIES = 'socialize/companies/setCompanies';
export const RESET_COMPANIES_STATE = 'socialize/companies/resetCompaniesState';

const initialState: InitialState = {
  companies: null,
};

export const companiesReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_COMPANIES:
      return {
        companies: (payload as CompanyItem[]),
      };
    case RESET_COMPANIES_STATE:
      return {
        ...initialState,
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

export const resetCompaniesState = () => ({
  type: RESET_COMPANIES_STATE,
});
