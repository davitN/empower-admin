import { AnyAction } from 'redux';
import { InitialStateGetCompanyDetails, CompanyItem, GetCompanyDetailsTypes } from '../../types/companies';
import { CallBacks } from '../../types/main';

export const GET_COMPANY_DETAILS = 'socialize/companies/getCompanyDetails';
export const SET_COMPANY_DETAILS = 'socialize/companies/setCompanyDetails';
export const RESET_COMPANY_DETAILS_STATE = 'socialize/companies/resetCompanyDetailsState';

const initialState: InitialStateGetCompanyDetails = {
  company: null,
};

export const companyDetailsReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_COMPANY_DETAILS:
      return {
        company: (payload as CompanyItem),
      };
    case RESET_COMPANY_DETAILS_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

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
