import { AnyAction } from 'redux';
import {
  GetCompaniesOptions, CompaniesTypes, InitialStateCompanies, CompanyItem, GetCompanyDetailsTypes, SaveDataTypes, GetCompanyAdminsParams, AllCompaniesItem,
} from '../../types/companies';
import { CallBacks } from '../../types/main';
import { AppAdminsData } from '../../types/appAdmin';

export const GET_COMPANIES = 'socialize/companies/getCompanies';
export const SET_COMPANIES = 'socialize/companies/setCompanies';
export const RESET_COMPANIES_STATE = 'socialize/companies/resetCompaniesState';

export const GET_ALL_COMPANIES = 'socialize/companies/getAllCompanies';
export const SET_ALL_COMPANIES = 'socialize/companies/setAllCompanies';
export const RESET_ALL_COMPANIES_STATE = 'socialize/companies/resetAllCompaniesState';

export const GET_COMPANY_DETAILS = 'socialize/companies/getCompanyDetails';
export const SET_COMPANY_DETAILS = 'socialize/companies/setCompanyDetails';
export const RESET_COMPANY_DETAILS_STATE = 'socialize/companies/resetCompanyDetailsState';

export const SAVE_COMPANY_DATA = 'socialize/companies/saveCompanyData';

export const GET_COMPANY_ADMINS = 'socialize/companies/getCompanyAdmins';
export const SET_COMPANY_ADMINS = 'socialize/companies/setCompanyAdmins';
export const RESET_COMPANY_ADMINS_STATE = 'socialize/companies/resetCompanyAdminsState';

const initialState: InitialStateCompanies = {
  companies: null,
  companyDetails: null,
  admins: null,
  allCompanies: null,
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
    case SET_ALL_COMPANIES:
      return {
        allCompanies: (payload as AllCompaniesItem),
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
    case SET_COMPANY_ADMINS:
      return {
        ...state,
        admins: (payload as AppAdminsData),
      };
    case RESET_COMPANY_ADMINS_STATE:
      return {
        ...state,
        admins: null,
      };
    case RESET_ALL_COMPANIES_STATE:
      return {
        ...state,
        allCompanies: null,
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

export const saveCompanyData = (data: SaveDataTypes, callbacks?: CallBacks) => ({
  type: SAVE_COMPANY_DATA,
  data,
  callbacks,
});

export const getCompanyAdmins = (params: GetCompanyAdminsParams, callbacks?: CallBacks) => ({
  type: GET_COMPANY_ADMINS,
  params,
  callbacks,
});
export const setCompanyAdmins = (admins: AppAdminsData) => ({
  type: SET_COMPANY_ADMINS,
  payload: admins,
});
export const resetCompanyAdminsState = () => ({
  type: RESET_COMPANY_ADMINS_STATE,
});

export const setAllCompanies = (companies: AllCompaniesItem[]) => ({
  type: SET_ALL_COMPANIES,
  payload: companies,
});
export const getAllCompanies = (callbacks?: CallBacks) => ({
  type: GET_ALL_COMPANIES,
  callbacks,
});
export const resetAllCompaniesState = () => ({
  type: RESET_ALL_COMPANIES_STATE,
});
