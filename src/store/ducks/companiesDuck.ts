import { AnyAction } from 'redux';
import {
  GetCompaniesOptions, CompaniesTypes, InitialStateCompanies, CompanyItem, GetCompanyDetailsTypes, SaveDataTypes,
} from '../../types/companies';
import { CallBacks } from '../../types/main';

export const GET_COMPANIES = 'socialize/companies/getCompanies';
export const SET_COMPANIES = 'socialize/companies/setCompanies';
export const RESET_COMPANIES_STATE = 'socialize/companies/resetCompaniesState';

export const GET_COMPANY_DETAILS = 'socialize/companies/getCompanyDetails';
export const SET_COMPANY_DETAILS = 'socialize/companies/setCompanyDetails';
export const RESET_COMPANY_DETAILS_STATE = 'socialize/companies/resetCompanyDetailsState';
export const SAVE_COMPANY_DETAILS = 'socialize/companies/saveCompanyDetails';

const initialState: InitialStateCompanies = {
  companies: null,
  companyDetails: null,
};

export const companiesReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_COMPANIES:
      return {
        companies: (payload as CompaniesTypes),
      };
    case SET_COMPANY_DETAILS:
      return {
        ...state,
        companyDetails: (payload as CompanyItem),
      };
    case RESET_COMPANIES_STATE:
      return {
        ...state,
        companies: null,
      };
    case RESET_COMPANY_DETAILS_STATE:
      return {
        ...state,
        companyDetails: null,
      };
    default:
      return state;
  }
};

export const setCompanies = (companies: CompaniesTypes) => ({
  type: SET_COMPANIES,
  payload: companies,
});

export const getCompanies = (data: GetCompaniesOptions, callbacks?: CallBacks) => ({
  type: GET_COMPANIES,
  data,
  callbacks,
});

export const resetCompaniesState = () => ({
  type: RESET_COMPANIES_STATE,
});

export const setCompanyDetails = (companies: CompanyItem) => ({
  type: SET_COMPANY_DETAILS,
  payload: companies,
});

export const getCompanyDetails = (id: GetCompanyDetailsTypes, callbacks?: CallBacks) => ({
  type: GET_COMPANY_DETAILS,
  id,
  callbacks,
});

export const resetCompanyDetailsState = () => ({
  type: RESET_COMPANY_DETAILS_STATE,
});

export const saveCompany = (data: SaveDataTypes) => ({
  type: SAVE_COMPANY_DETAILS,
  data,
});
